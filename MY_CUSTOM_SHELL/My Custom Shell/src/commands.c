#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include "commands.h"

void execute_internal_command(char **args) {
    if (strcmp(args[0], "cd") == 0) {
        if (args[1] == NULL) {
            fprintf(stderr, "cd: expected argument to \"cd\"\n");
        } else {
            if (chdir(args[1]) != 0) {
                perror("cd failed");
            }
        }
    } else if (strcmp(args[0], "exit") == 0) {
        exit(0);
    } else if (strcmp(args[0], "echo") == 0) {
        for (int i = 1; args[i] != NULL; i++) {
            printf("%s ", args[i]);
        }
        printf("\n");
    } else {
        fprintf(stderr, "%s: command not found\n", args[0]);
    }
}


void execute_command(char *args[]) {
    if (strcmp(args[0], "cd") == 0) {
        if (args[1] == NULL) {
            fprintf(stderr, "cd: missing argument\n");
        } else {
            if (chdir(args[1]) != 0) {
                perror("cd");
            }
        }
    }
    else if (strcmp(args[0], "clr") == 0) {
        printf("\033[H\033[J");  // Clears the terminal
    }
    else if (strcmp(args[0], "dir") == 0) {
        system("ls -l");
    }
    else if (strcmp(args[0], "environ") == 0) {
        extern char **environ;
        for (char **env = environ; *env != NULL; env++) {
            printf("%s\n", *env);
        }
    }
    else if (strcmp(args[0], "echo") == 0) {
        for (int i = 1; args[i] != NULL; i++) {
            printf("%s ", args[i]);
        }
        printf("\n");
    }
    else if (strcmp(args[0], "help") == 0) {
        printf("Supported commands:\n");
        printf("cd <dir>     - Change directory\n");
        printf("clr          - Clear screen\n");
        printf("dir          - List files in current directory\n");
        printf("environ      - Print environment variables\n");
        printf("echo <msg>   - Print a message\n");
        printf("help         - Show help message\n");
        printf("pause        - Pause shell execution\n");
        printf("quit         - Exit shell\n");
    }
    else if (strcmp(args[0], "pause") == 0) {
        printf("Press Enter to continue...\n");
        getchar();
    }
    else if (strcmp(args[0], "quit") == 0) {
        exit(0);
    }
    else {
        printf("Unknown command: %s\n", args[0]);
    }
}
