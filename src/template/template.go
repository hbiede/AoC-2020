package main

import (
	"bufio"
	"flag"
	"fmt"
	"log"
	"os"
)

var (
	partA       = flag.Bool("partA", true, "Perform part A solution?")
	inputFile   = flag.String("inputFile", "day!DAY!/input.txt", "Input File")
)

func main() {
	flag.Parse()

	inputText := processInput()
	
	if *partA {
		// part A
		fmt.Printf("Part A")
	} else {
		// part B
	}
}

func processInput() string {
    file, err := os.Open(*inputFile)
	if err != nil {
		log.Fatal(err)
	}
	//noinspection GoUnhandledErrorResult
	defer file.Close()

	// Read in inputs
	scanner := bufio.NewScanner(file)
	inputStringFromFile := ""
	for scanner.Scan() {
		inputStringFromFile += scanner.Text()
	}
    return inputStringFromFile
}
