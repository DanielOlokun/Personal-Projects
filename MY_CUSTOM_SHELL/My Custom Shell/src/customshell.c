#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include <unistd.h>    // for fork(), execvp(), and _exit()
#include <sys/types.h> // for pid_t
#include <sys/wait.h>  // for wait()
#include <stdlib.h>     // for setenv()
#include <stdio.h>      // for printf(), perror()
#include "commands.h"
#include "parser.h"



#define MAX_CMD_LENGTH 1024

// Function prototypes
void process_command(char *cmd);
int interactive_mode();
int batch_mode(FILE *file);
void execute_external_command(char **args); // called when external function is called


int main(int argc, char *argv[]) {
    if (argc == 2) {
        // Batch mode
        FILE *file = fopen(argv[1], "r");
        if (file == NULL) {
            perror("Error opening file");
            return 1;
        }
        batch_mode(file);
        fclose(file);
    } else {
        interactive_mode();
    }
    return 0;
}

//processes commands when in interactive mode
int interactive_mode() {
    char cmd[MAX_CMD_LENGTH];

    while (1) {
        printf("> ");
        if (fgets(cmd, sizeof(cmd), stdin) == NULL) {
            break;
        }

        cmd[strcspn(cmd, "\n")] = 0;


        if (strcmp(cmd, "quit") == 0) {
            break;
        }

        process_command(cmd);
    }

    return 0;
}

// fxn to process commands from file (batch mode)
int batch_mode(FILE *file) {
    char cmd[MAX_CMD_LENGTH];

    while (fgets(cmd, sizeof(cmd), file) != NULL) {

        cmd[strcspn(cmd, "\n")] = 0;


        if (strcmp(cmd, "quit") == 0) {
            break;
        }

        process_command(cmd);
    }

    return 0;
}


void process_command(char *cmd) {
    if (strcmp(cmd, "help") == 0) {
        printf("Help: This is your custom shell.\n");
        printf("Available commands: help, quit, <your custom commands here>\n");
    } else if (strcmp(cmd, "quit") == 0) {
        printf("Exiting shell...\n");
        exit(0);
    } else {
        printf("Executing command: %s\n", cmd);

        // Split the command into arguments (space separated)
        char *args[100];  // Array to store command and its arguments
        int i = 0;
        char *token = strtok(cmd, " ");
        while (token != NULL) {
            args[i] = token;  // Store each part of the command
            token = strtok(NULL, " ");
            i++;
        }
        args[i] = NULL;  // Terminate the argument list with NULL

        if (contains_redirection(args)) {
            handle_redirection(args);
        }

        pid_t pid = fork();  // Fork a child process

        if (pid == 0) {  // Child process
            // Try to execute the command using execvp
            if (execvp(args[0], args) == -1) {
                perror("execvp failed");  // If execvp fails, print the error
                exit(EXIT_FAILURE);  // Exit child process
            }
        } else if (pid > 0) {  // Parent process
            wait(NULL);  // Wait for the child process to complete
        } else {
            perror("fork failed");  // If fork fails, print an error
        }
    }
}

