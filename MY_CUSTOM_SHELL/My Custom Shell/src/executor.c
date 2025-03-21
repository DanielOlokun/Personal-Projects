#include <stdlib.h>  // For setenv()
#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <sys/wait.h>
#include <fcntl.h>
#include "customshell.h"

void execute_external_command(char **args) {
    int run_in_background = 0;
    int arg_count = 0;

    // Check if last argument is "&" (for background execution)
    while (args[arg_count] != NULL) {
        arg_count++;
    }

    if (arg_count > 0 && strcmp(args[arg_count - 1], "&") == 0) {
        run_in_background = 1;
        args[arg_count - 1] = NULL;  // Remove "&" from arguments
    }

    pid_t pid = fork();
    if (pid == 0) { // Child process
        setenv("parent", "/customshell", 1); // Set parent environment variable
        execvp(args[0], args);  // Execute the external command
        perror("execvp failed");
        exit(EXIT_FAILURE);
    } else if (pid < 0) {
        perror("fork failed");
    } else { // Parent process
        if (!run_in_background) {
            wait(NULL);  // Wait for the child process if it's not in the background
        } else {
            printf("[Process running in background] PID: %d\n", pid);
        }
    }
}

void handle_redirection(char **args) {
    int in = -1, out = -1, append = -1;

    // Detect redirection symbols: <, >, >>
    for (int i = 0; args[i] != NULL; i++) {
        if (strcmp(args[i], "<") == 0) { // Input redirection
            in = i;
        } else if (strcmp(args[i], ">") == 0) { // Output redirection
            out = i;
        } else if (strcmp(args[i], ">>") == 0) { // Append redirection
            append = i;
        }
    }

    if (in != -1) { // Handle input redirection
        int fd = open(args[in + 1], O_RDONLY);
        if (fd < 0) {
            perror("Failed to open input file");
            exit(EXIT_FAILURE);
        }
        dup2(fd, STDIN_FILENO);
        close(fd);
        args[in] = NULL; // Remove redirection symbol from arguments
    }

    if (out != -1) { // Handle output redirection
        int fd = open(args[out + 1], O_WRONLY | O_CREAT | O_TRUNC, 0644);
        if (fd < 0) {
            perror("Failed to open output file");
            exit(EXIT_FAILURE);
        }
        dup2(fd, STDOUT_FILENO);
        close(fd);
        args[out] = NULL;
    }

    if (append != -1) { // Handle append redirection
        int fd = open(args[append + 1], O_WRONLY | O_CREAT | O_APPEND, 0644);
        if (fd < 0) {
            perror("Failed to open output file");
            exit(EXIT_FAILURE);
        }
        dup2(fd, STDOUT_FILENO);
        close(fd);
        args[append] = NULL;
    }
}
