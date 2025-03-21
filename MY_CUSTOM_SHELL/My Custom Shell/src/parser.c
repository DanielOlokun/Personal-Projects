#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "customshell.h"
#include "commands.h"
#include <unistd.h>


void parse_and_execute(char *input) {
    // Trim the newline character
    input[strcspn(input, "\n")] = 0;

    char *args[100];
    int arg_count = 0;
    char *token = strtok(input, " ");

    // Split input into arguments
    while (token != NULL) {
        args[arg_count++] = token;
        token = strtok(NULL, " ");
    }
    args[arg_count] = NULL; // Null-terminate the argument list

    // Check if it's an internal command
    if (args[0] != NULL) {
        if (strcmp(args[0], "cd") == 0 || strcmp(args[0], "echo") == 0 || strcmp(args[0], "exit") == 0) {
            execute_internal_command(args);  // For internal commands
        } else {
            execute_external_command(args);  // For external commands
        }
    }
}

int contains_redirection(char **args) {
    int i = 0;
    while (args[i] != NULL) {
        if (strcmp(args[i], "<") == 0 || strcmp(args[i], ">") == 0 || strcmp(args[i], ">>") == 0) {
            return 1; // Redirection found
        }
        i++;
    }
    return 0; // No redirection
}

