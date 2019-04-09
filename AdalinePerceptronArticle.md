# The Math behind the Perceptron: Part 1 - The ADALINE Perceptron

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

In this article we will build on the Rosenblatt Perceptron. It was one of the first perceptrons, if not the first. During this article I will simply be using the name "Perceptron" when referring to the Rosenblatt Perceptron

We will investigate the math envolved and discuss its limitations, thereby setting the ground for the future articles. 