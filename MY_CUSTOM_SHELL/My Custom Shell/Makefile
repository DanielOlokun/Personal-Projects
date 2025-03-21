CC = gcc
CFLAGS = -Wall -Wextra -std=c99 -D_POSIX_C_SOURCE=200809L
SRC = src/customshell.c src/commands.c src/executor.c src/parser.c
OUT = bin/customshell  # outputs binary

# builds shell
all: $(SRC)
	$(CC) $(CFLAGS) $(SRC) -o $(OUT)

# cleans up the build
clean:
	rm -f $(OUT)
	rm -f src/*.o
