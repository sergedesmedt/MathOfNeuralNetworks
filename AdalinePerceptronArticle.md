https://en.wikibooks.org/wiki/LaTeX/Advanced_Mathematics
https://www.overleaf.com/learn/latex/Integrals,_sums_and_limits
http://web.ift.uib.no/Teori/KURS/WRK/TeX/symALL.html
https://latex.org/forum/viewtopic.php?t=8863


# The Math behind Neural Networks: Part 2 - The ADALINE Perceptron

## Introduction

A lot of articles introduce the perceptron showing the basic mathematical formulas that define it, but without offering much of an explanation on what exactly makes it work.

And surely it is possible to use the perceptron without really understanding the basic math involved with it, but is it not also fun to see how all this math you learned in school can help you understand the perceptron, and in extension, neural networks?

I also got inspired for this article by a series of articles on [Support Vector Machines](https://www.svm-tutorial.com/svm-tutorial/math-svm-tutorial/), explaining the basic mathematical concepts involved, and slowly building up to the more complex mathematics involved. So that is my intention with this article and the accompaning code: show you the math envolved in the preceptron. And, if time permits, I will write articles all the way up to convolutional neural networks.

Of course, when explaining the math, the question is: when do you stop explaining? There is some math involved that is rather basic, like for example *what is a vector?*, *what is a cosine?*, etc... I will assume some basic knowledge of mathematics like you have some idea a what *a vector* is, you know the basics of geometry, etc... My assumptions will be arbitraty, so if you think i'm going too fast in some explanations just leave a comment.

So, let us get started.

### Disclaimer

This article is about the math involved in the perceptron and NOT about the code used and written to illustrate these mathematical concepts. Although it is not my intention to write such an article, never say never....

### Setting some bounds

A perceptron basically takes some input values, called "features" and represented by the values $x_1, x_2, ... x_n$ in the following formula , multiplies them by some factors called "weights", represented by $w_1, w_2, ... w_n$, takes the sum of these multiplications and depending on the value of this sum outputs another value $o$:

$$o = f(w_1x_1 + w_2x_2 + ... + w_ix_i + ... + w_nx_n)$$

There are  a few types of perceptrons, differing in the way the sum results in the output, thus the function $f()$ in the above formula.

In this article we will build on the Adaline Perceptron. During this article I will simply be using the name "Perceptron" when referring to the Adaline Perceptron. I asume you have read the article about the Rosenblatt Perceptron and thus are allready familiar with the basic vector math necessary to understand ghe basic formulas of a general perceptron.

We will investigate the math envolved and discuss its limitations, thereby setting the ground for the future articles.

### The basic math formula for the ADALINE Perceptron

There's not a big difference between the math formula for the Rosenblatt perceptron and for the ADALINE perceptron:

$$
f(x)  =  
  \begin{cases}
 1 & \text{if } w_1x_1 + w_2x_2 + ... + w_ix_i + ... + w_nx_n > b\\
 -1 & \text{otherwise} 
  \end{cases}
$$

The main difference is that the $otherwise$ case returns $-1$ instead of $0$ which is important here.

But we still calculate the dot-product and compare it with a value, so we still only have two possible outcomes and we still can only classify linearily seperable data. So, basically we can do nothing more then what we could do with the Rosenblatt perceptron.

So then why do we need a new perceptron?

### Why do we need another perceptron?

In the previous article about the Rosenblatt perceptron we where eventually able to divide "things" into two different classes through a linear combination of its features. What can we want more?

Well, a better estimate of the linear boundary would be nice. With the Rosenblatt preceptron we do not have any control over the boundary which the learning will eventually give us: like demonstrated in the previous article it could be any line which seperates our two classes:

==afbeelding van alle mogelijke lijnen die onze twee klassen scheiden, zie artikel over rosenblatt==

Remember the learning procedure of the Rosenblatt perceptron. We defined the error $e$ as being the difference between the desired output $d$ and the effective output $o$ for an input vector $\mathbf{x}$ and a weight vector $\mathbf{w}$:

$$\begin{aligned}
e &= d-o\\
&= d-H(\mathbf{w} \cdot \mathbf{x})
\end{aligned}$$

*(If the above formulas look like chinese to you, you should have a look at [the article about the Rosenblatt perceptron](linknaardatartikel))*
The effective output $o$ is determined by the Heaviside step function. We could define a cost function using this error and then try to minimize this cost function. But herein is the problem: minimization of a function is typicaly done through differentiating the function.

For differentiation a function it has to be continuous and the Heaviside step function is not continuous.(==is dit zo?==

https://math.stackexchange.com/questions/13898/how-to-prove-that-the-derivative-of-heavisides-unit-step-function-is-the-dirac

Differentiation of a function is equal to finding the slope (gradient) of a function, and if the slope of a function is zero, we typically have a maximum or minimum value for this function, unless it is a deflection point:

==hier aan afbeelding van een functie met een minimum, maximum en een buigpunt (deflection point)==

The ADALINE perceptron however defines the error as being the difference between the desired outcome $d$ and the value of the dot-product, thus the value before applying the activation function:

$$e = d-\mathbf{w} \cdot \mathbf{x}$$

And this is continuous and thus differentiatable.

### Differentiatable, Continuous? What are you talking about?

==nog uit te zoeken: waarom moet een differentieerbare functie continu zijn?
zie ook: https://www.geeksforgeeks.org/mathematics-limits-continuity-differentiability/==

Let's say we have a function with a single variable:

$$y = f(x)$$

The mathematical definition of differentiation is:

$$f'(x) = \lim_{h\to0}\frac{f(x+h) - f(x)}{h}$$

What is this $\lim_{h\to0}$ thing?
In general, when we write:
$$\lim_{x\to{c}}f(x) = L$$
we mean the value the function $f(x)$ takes as $x$ approaches $c$
From Wikipedia:
>$f(x)$ can be made to be as close to $L$ as desired by making $x$ sufficiently close to $c$. In that case, the above equation can be read as "the limit of $f$ of $x$, as $x$ approaches $c$, is $L$"

It does *NOT* mean that $x$ becomes equal to $L$ !!! So, it is approaching without ever reaching it.

A mathematical more rigourous definition is known as the (ε, δ)-definition of limit.

==volgende nog eens lezen en bekijken hoe we dit kunnen integreren:
https://math.libretexts.org/Bookshelves/Calculus/Book%3A_Calculus_(Apex)/1%3A_Limits/1.2%3A_Epsilon-Delta_Definition_of_a_Limit==

Put simply: it is the change in the result of a function divided by the change in argument of that function, for a change in argument going to $0$.
==nog opmerking maken dat dit dus niet gelijk is aan de change gelijk aan nul, maar enkel een change gaande naar 0==

==waarom moet een differentieerbare functie continu zijn?==

Of course, our function can be dependent on more than one argument:

$$y = f(x_1,x_2,...,x_n)$$

In this case we talk of *partial derrivatives*:

==de wiskundige definitie van partieel afgeleiden



==volgende is geen deel van het artikel==

The heaviside step function is discontinuous. A function $f(x)$ is continuous if a small change of $x$ results in a small change in the outcome of the function. This is clearly not the case for the He heaviyside step function: if at 0 and moving to the negative side then the function outcome changes suddenly from 1 to 0.

https://proofwiki.org/wiki/Continuity_of_Heaviside_Step_Function
https://math.stackexchange.com/questions/497798/proving-discontinuity-by-epsilon-delta
https://www.intmath.com/functions-and-graphs/7-continuous-discontinuous-functions.php
https://math.stackexchange.com/questions/828508/why-can-a-discontinuous-function-not-be-differentiablettps://stackedit.io/).