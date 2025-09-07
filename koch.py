import turtle
import multiprocessing

# Función recursiva para la curva de Koch
def koch_line(t, length, level):
    if level == 0:
        t.forward(length)
    else:
        length /= 3.0
        koch_line(t, length, level-1)
        t.left(60)
        koch_line(t, length, level-1)
        t.right(120)
        koch_line(t, length, level-1)
        t.left(60)
        koch_line(t, length, level-1)

# Dibuja el copo completo
def draw_full():
    screen = turtle.Screen()
    screen.setup(width=800, height=800)   # Ventana cuadrada
    screen.bgcolor("black")
    t = turtle.Turtle()
    t.speed(0)
    t.color("cyan")

    # Centrar bien el copo
    t.penup()
    t.goto(-200, -120)  # Ajustamos para que todo quede dentro
    t.pendown()

    for i in range(3):  # Los tres lados del triángulo
        koch_line(t, 400, 4)
        t.right(120)

    t.hideturtle()
    screen.mainloop()

# Dibuja solo la mitad superior
def draw_half():
    screen = turtle.Screen()
    screen.setup(width=800, height=800)   # Ventana cuadrada
    screen.bgcolor("black")
    t = turtle.Turtle()
    t.speed(0)
    t.color("cyan")

    t.penup()
    t.goto(-200, -20)   # Un poco más centrado
    t.pendown()

    for i in range(2):  # Solo dos lados (parte superior)
        koch_line(t, 400, 4)
        t.right(120)

    t.hideturtle()
    screen.mainloop()

if __name__ == "__main__":
    p1 = multiprocessing.Process(target=draw_full)
    p2 = multiprocessing.Process(target=draw_half)

    p1.start()
    p2.start()

    p1.join()
    p2.join()
