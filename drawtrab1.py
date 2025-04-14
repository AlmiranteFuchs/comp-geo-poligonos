#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sys
from matplotlib.pyplot import figure, show

def le_poligono(p=0):
    global abscissas, ordenadas, maxx, maxy, minx, miny

    ax = []
    ay = []
    n = int(sys.stdin.readline())
    for i in range(n):
        a = sys.stdin.readline().split()
        x = int(a[0])
        y = int(a[1])
        ax.append(x)
        ay.append(y)
        if x > maxx:
            maxx = x
        if x < minx:
            minx = x
        if y > maxy:
            maxy = y
        if y < miny:
            miny = y
    ax.append(ax[0])
    ay.append(ay[0])
    abscissas.append(ax)
    ordenadas.append(ay)

def le_entrada():
    global n_poly, n_point, px, py, maxx, maxy, minx, miny

    a = sys.stdin.readline().split()
    n_poly = int(a[0])
    n_point = int(a[1])

    for p in range(n_poly):
        le_poligono(p)

    for p in range(n_point):
        a = sys.stdin.readline().split()
        x = int(a[0])
        y = int(a[1])
        if x > maxx:
            maxx = x
        if x < minx:
            minx = x
        if y > maxy:
            maxy = y
        if y < miny:
            miny = y
        px.append(x)
        py.append(y)

abscissas = []
ordenadas = []
px = []
py = []

maxx = -99999
maxy = -99999
minx = 99999
miny = 99999

le_entrada()

dx = maxx - minx
dy = maxy - miny
ex = dx * 0.1
ey = dy * 0.1
e = int(max(ex, ey)) + 1

print("dx, dy, ex, ey, e:", dx, dy, ex, ey, e)
print("abscissas:", abscissas)
print("ordenadas:", ordenadas)
print("px:", px)
print("py:", py)

dx = dx + 2 * e
dy = dy + 2 * e
maxx = maxx + e
maxy = maxy + e
minx = minx - e
miny = miny - e

print("dx, dy (expanded):", dx, dy)
print("x range:", minx, "to", maxx)
print("y range:", miny, "to", maxy)

fig = figure(1, figsize=(dx, dy))
ax = fig.add_subplot(111, autoscale_on=False, xlim=(minx, maxx), ylim=(miny, maxy))

for p in range(n_poly):
    ax.plot(abscissas[p], ordenadas[p], lw=3, color='black')

for p in range(n_point):
    ax.plot(px[p], py[p], 'ro')

show()
