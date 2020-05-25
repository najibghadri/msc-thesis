#!/bin/bash
for N in {5932..6031}
do
	echo $N
	montage -geometry +0+0 -tile 3x2  0000${N}LC2.jpg 0000${N}FL.jpg 0000${N}RC2.jpg 0000${N}L2.jpg black.jpg 0000${N}R2.jpg 0000${N}montage.jpg
done
