# for use with pret/pokeyellow to generate the pokedex data
import re

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
    return ''.join(lines)

base_stats = None
def get_base_stats():
    global base_stats
    if not base_stats:
        base_stats = recursive_read('data/base_stats.asm')
    return base_stats

base_stats = get_base_stats()
names = re.findall('DEX_([A-Z_]+)', base_stats)
catch_rates = re.findall('db ([0-9]+) ; catch rate', base_stats)
base_hps = re.findall('db ([0-9]+) ; base hp', base_stats)
for i in range(0, 150):
    print('{"name": "'+names[i] + '","baseHP": ' + str(base_hps[i]) + ',"catchRate": ' + str(catch_rates[i]) + "},")

print('{"name": "MEW","basehp": 100,"catchRate": 45}')