from __future__ import annotations

from typing import Dict, List, Mapping, Optional, Sequence, Set, Tuple, Union
#from advent import Input
import re
from collections import defaultdict
from math import ceil, floor

# input = (
# 	Input(
# 		day = 23,
# 		# sample = True,
# 	)
# 		# .all()
# 		# .ints()
# 		# .lines()
# 		# .line_tokens()
# 		# .line_tokens(sep = "\n", line_sep = "\n\n")
# 		# .program()
# )

class Node:
	next: Node
	val: int

	def __init__(self, v: int):
		self.val = v

n = 1000000
steps = 10000000
# n = 9
# steps = 100
sample = "389125467"
input = "685974213"
order: List[int] = [int(x) for x in input] + list(range(10, 1000001))
lookup: Dict[int, Node] = dict()

for i in range(1, n+1):
	lookup[i] = Node(i)

for i in range(len(order)):
	lookup[order[i]].next = lookup[order[(i+1)%len(order)]]

cur: Node = lookup[order[0]]

def dump():
	cur = lookup[1].next
	print(1, end="")
	while cur.val != 1:
		print(cur.val, end="")
		cur = cur.next
	print()

for i in range(steps):
	if i % 100000 == 0:
		print(i)
	pickup = cur.next
	cur.next = cur.next.next.next.next

	v = cur.val
	# print(cur.val, pickup.val, pickup.next.val, pickup.next.next.val)

	while v in [cur.val, pickup.val, pickup.next.val, pickup.next.next.val]:
		v -= 1
		if v == 0:
			v = n

	loc = lookup[v]
	pickup.next.next.next = loc.next
	loc.next = pickup
	cur = cur.next
	if n < 100:
		dump()

if n < 100:
	dump()
print(lookup[1].next.val * lookup[1].next.next.val)

# original part 1 solution below

# for i in range(100):
# 	pickup = order[1:4]
# 	order = [order[0]] + order[4:]
# 	dest = order[0]
# 	while dest == order[0] or dest in pickup:
# 		dest -= 1
# 		if dest == 0:
# 			dest = n
# 	spl = order.index(dest)
# 	order = order[:spl+1] + pickup + order[spl+1:]
# 	order = order[1:] + [order[0]]

# print("".join([str(x) for x in order]))
