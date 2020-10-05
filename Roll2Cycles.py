import regex
import numpy
numpy.set_printoptions(threshold=numpy.inf)

def recursive_read(filename):
    def recurse(filename_):
        lines = []
        for line in open(filename_):
            if 'include "' in line.lower():
                lines += recurse(line.split('"')[1])
            else:
                lines += [line]
        return lines
    lines = recurse(filename)
    return lines

allLines = recursive_read('red_balls.txt')
array = numpy.zeros((3,414,414))
for line in allLines:
    counts = regex.findall(r'[0-9]+', line)
    ball = int(counts[0]) - 2
    maxHP = int(counts[1]) - 1
    curHP = int(counts[2]) - 1
    cycle = int(counts[3])
    array[ball][maxHP][curHP] = cycle
f = open("ballArray.txt", "w")
f.write(str(array))
f.close()