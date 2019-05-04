

# The Math behind Neural Networks: Part 1 - The Rosenblatt Perceptron

## Introduction

A lot of articles introduce the perceptron showing the basic mathematical formulas that define it, but without offering much of an explanation on what exactly makes it work.

And surely it is possible to use the perceptron without really understanding the basic math involved with it, but is it not also fun to see how all this math you learned in school can help you understand the perceptron, and in extension, neural networks?

I also got inspired for this article by a series of articles on [Support Vector Machines](https://www.svm-tutorial.com/svm-tutorial/math-svm-tutorial/), explaining the basic mathematical concepts involved, and slowly building up to the more complex mathematics involved. So that is my intention with this article and the accompaning code: show you the math envolved in the preceptron. And, if time permits, I will write articles all the way up to convolutional neural networks.

Of course, when explaining the math, the question is: where do you start and when do you stop explaining? There is some math involved that is rather basic, like for example *what is a vector?*, *what is a cosine?*, etc... I will assume some basic knowledge of mathematics like you have some idea of what *a vector* is, you know the basics of geometry, etc... My assumptions will be arbitraty, so if you think i'm going too fast in some explanations just leave a comment and I will try to expand on the subject.

So, let us get started.

### Disclaimer

This article is about the math involved in the perceptron and NOT about the code used and written to illustrate these mathematical concepts. Although it is not my intention to write such an article, never say never....

### Setting some bounds

A perceptron basically takes some input values, called "features" and represented by the values ![](https://latex.codecogs.com/gif.latex?x_1,&space;x_2,&space;...&space;x_n) in the following formula , multiplies them by some factors called "weights", represented by ![](https://latex.codecogs.com/gif.latex?w_1,&space;w_2,&space;...&space;w_n), takes the sum of these multiplications and depending on the value of this sum outputs another value ![](https://latex.codecogs.com/gif.latex?o):

<div align="center"><img src="https://latex.codecogs.com/gif.latex?o&space;=&space;f(w_1x_1&space;&plus;&space;w_2x_2&space;&plus;&space;...&space;&plus;&space;w_ix_i&space;&plus;&space;...&space;&plus;&space;w_nx_n)" title="o = f(w_1x_1 + w_2x_2 + ... + w_ix_i + ... + w_nx_n)" /></div>

There are  a few types of perceptrons, differing in the way the sum results in the output, thus the function ![](https://latex.codecogs.com/gif.latex?f()) in the above formula.

In this article we will build on the Rosenblatt Perceptron. It was one of the first perceptrons, if not the first. During this article I will simply be using the name "Perceptron" when referring to the Rosenblatt Perceptron

We will investigate the math envolved and discuss its limitations, thereby setting the ground for the future articles. 

## The basic math formula for the Rosenblatt Perceptron

<div align="center"><img src="https://latex.codecogs.com/gif.latex?f(x)&space;=&space;\begin{cases}&space;1&space;&&space;\text{if&space;}&space;w_1x_1&space;&plus;&space;w_2x_2&space;&plus;&space;...&space;&plus;&space;w_ix_i&space;&plus;&space;...&space;&plus;&space;w_nx_n&space;>&space;b\\&space;0&space;&&space;\text{otherwise}&space;\end{cases}" title="f(x) = \begin{cases} 1 & \text{if } w_1x_1 + w_2x_2 + ... + w_ix_i + ... + w_nx_n > b\\ 0 & \text{otherwise} \end{cases}" /></div>

So, what the perceptron basically does is take some *linear combination* of *input values* or *features*, compare it to a *threshold* value ![](https://latex.codecogs.com/gif.latex?b), and *return 1 if the threshold is exceeded and zero if not*.

The feature vector is a group of characteristics describing the objects we want to classify

In other words, we classify our objects into two classes: a set of objects with characteristics (and thus a feature vector) resulting in in output of 1, and a set of objects with characteristics resulting in an output of 0.

If you search the internet on information about the perceptron you will find alternative definitions which define the formula as follows:

<div align="center">
<img src="https://latex.codecogs.com/gif.latex?f(x)&space;=&space;\begin{cases}&space;&plus;1&space;&&space;\text{if&space;}&space;w_1x_1&space;&plus;&space;w_2x_2&space;&plus;&space;...&space;&plus;&space;w_ix_i&space;&plus;&space;...&space;&plus;&space;w_nx_n&space;>&space;b\\&space;-1&space;&&space;\text{otherwise}&space;\end{cases}" title="f(x) = \begin{cases} +1 & \text{if } w_1x_1 + w_2x_2 + ... + w_ix_i + ... + w_nx_n > b\\ -1 & \text{otherwise} \end{cases}" />
</div>

We will see further this does not affect the workings of the perceptron

Lets digg a little deeper:
  
## Take a linear combination of input values


Remember the introduction. In it we said the perceptron takes some input value ![](https://latex.codecogs.com/gif.latex?%5Bx_1%2C%20x_2%2C%20...%2C%20x_i%2C%20...%2C%20x_n%5D), also called features, some weights ![](https://latex.codecogs.com/gif.latex?%5Bw_1%2C%20w_2%2C%20...%2C%20w_i%2C%20...%2C%20w_n%5D), multiplies them with each other and takes the sum of these multiplications:

<div align="center">
<img src="https://latex.codecogs.com/gif.latex?w_1x_1&space;&plus;&space;w_2x_2&space;&plus;&space;...&space;&plus;&space;w_ix_i&space;&plus;&space;...&space;&plus;&space;w_nx_n" title="w_1x_1 + w_2x_2 + ... + w_ix_i + ... + w_nx_n" />
</div>

This is the definition of a *Linear Combination*: it is the sum of some terms multiplied by constant values. In our case the terms are the features and the constants are the weights.

If we substitute the subscript by a variable![](https://latex.codecogs.com/gif.latex?i), then we can write the sum as

<div align="center">
<img src="https://latex.codecogs.com/gif.latex?\sum_{i=1}^{n}&space;w_ix_i" title="\sum_{i=1}^{n} w_ix_i" />
</div>

This is called the [Capital-sigma notation](https://en.wikipedia.org/wiki/Summation#Capital-sigma_notation), the ![](https://latex.codecogs.com/gif.latex?%5Csum) represents the summation, the subscript ![](https://latex.codecogs.com/gif.latex?_%7Bi%3D1%7D) and the superscript ![](https://latex.codecogs.com/gif.latex?%5E%7Bn%7D) represent the range over which we take the sum and finally ![](https://latex.codecogs.com/gif.latex?w_ix_i) represents the "things" we take the sum of.

Also, we can see all ![](https://latex.codecogs.com/gif.latex?x_i) and all ![](https://latex.codecogs.com/gif.latex?w_i) as so-called *vectors*:

<div align="center">
<img src="https://latex.codecogs.com/gif.latex?\begin{aligned}&space;\mathbf{x}&=[x_1,&space;x_2,&space;...,&space;x_i,&space;...,&space;x_n]\\&space;\mathbf{w}&=[w_1,&space;w_2,&space;...,&space;w_i,&space;...,&space;w_n]&space;\end{aligned}" title="\begin{aligned} \mathbf{x}&=[x_1, x_2, ..., x_i, ..., x_n]\\ \mathbf{w}&=[w_1, w_2, ..., w_i, ..., w_n] \end{aligned}" />
</div>

In this, ![](https://latex.codecogs.com/gif.latex?n) represents the dimension of the vector: it is the number of scalar elements in the vector. For our discussion, it is the number of characteristics used to describe the objects we want to classify.
In this case, the summation is the so-called *dot-product* of the vectors:

<div align="center">
<img src="https://latex.codecogs.com/gif.latex?\mathbf{w}&space;\cdot&space;\mathbf{x}" title="\mathbf{w} \cdot \mathbf{x}" />
</div>

> About the notation: we write simple scalars (thus simple numbers) as small letters, and vectors as bold letters. So in the above ![](https://latex.codecogs.com/gif.latex?%5Cmathbf%7Bx%7D) and ![](https://latex.codecogs.com/gif.latex?%5Cmathbf%7Bw%7D) are vectors and ![](https://latex.codecogs.com/gif.latex?x_i) and ![](https://latex.codecogs.com/gif.latex?w_i) are scalars: they are simple numbers representing the components of the vector.

## Oooh, hold your horses! You say what? A 'Vector' ?

Ok, I may have gone a little too fast there by introducing vectors and not explaining them.

### Definition of a Vector

To make things more visual (which can help but isn't always a good thing), I will start with a graphical representation of a 2-dimensional vector:

![A vector in 2-dim space](https://sergedesmedt.github.io/MathOfNeuralNetworks/Resources/Vector.PNG)

The above point in the coordinate space ![](https://latex.codecogs.com/gif.latex?%5Cmathbb%7BR%7D%5E2) can be represented by a vector going from the origin to that point:
<div align="center">
<img src="https://latex.codecogs.com/gif.latex?\mathbf{a}&space;=&space;(a_1,&space;a_2),&space;\text{&space;in&space;}\mathbb{R}^2" title="\mathbf{a} = (a_1, a_2), \text{ in }\mathbb{R}^2" />
</div>

We can further extend this to 3-dimensional coordinate space and generalize it to n-dimensional space:
<div align="center">
<img src="https://latex.codecogs.com/gif.latex?\mathbf{a}&space;=&space;(a_1,&space;a_2,&space;...,&space;a_n),&space;\text{&space;in&space;}\mathbb{R}^n" title="\mathbf{a} = (a_1, a_2, ..., a_n), \text{ in }\mathbb{R}^n" /></div>

In text (from Wikipedia):
> A (Euclidean) Vector is a geometric object that has a magnitude and a direction

#### The Magnitude of a Vector 
The magnitude of a vector, also called its norm, is defined by the root of the sum of the squares of it's components and is written as ![](https://latex.codecogs.com/gif.latex?%5Clvert%5Clvert%7B%5Cmathbf%7Ba%7D%7D%5Clvert%5Clvert)
In 2-dimensions, the definition comes from Pythagoras' Theorem:
<div align="center">
<img src="https://latex.codecogs.com/gif.latex?\lvert\lvert{\mathbf{a}}\lvert\lvert&space;=&space;\sqrt{(a_1)^2&space;&plus;&space;(x_2)^2}" title="\lvert\lvert{\mathbf{a}}\lvert\lvert = \sqrt{(a_1)^2 + (x_2)^2}" />
</div>

Extended to n-dimensional space, we talk about the Euclidean norm:
<div align="center">
<img src="https://latex.codecogs.com/gif.latex?\lvert\lvert{\mathbf{a}}\lvert\lvert&space;=&space;\sqrt{a_1^2&space;&plus;&space;a_2^2&space;&plus;&space;...&space;&plus;&space;a_i^2&space;&plus;&space;...&space;&plus;&space;a_n^2}&space;=&space;\sqrt{\sum_{i=1}^{n}&space;a_i^2}" title="\lvert\lvert{\mathbf{a}}\lvert\lvert = \sqrt{a_1^2 + a_2^2 + ... + a_i^2 + ... + a_n^2} = \sqrt{\sum_{i=1}^{n} a_i^2}" />
</div>

Try it yourself:
[Vector Magnitude interactive](https://sergedesmedt.github.io/MathOfNeuralNetworks/VectorProperties.html#learn_vector_prop_magnitude)

#### The Direction of a Vector
The direction of a 2-dimensional vector is defined by its angle to the positive horizontal axis:
<div align="center">
<img src="https://latex.codecogs.com/gif.latex?\theta&space;=\tan^{-1}(\frac{a_2}{a_1})" title="\theta =\tan^{-1}(\frac{a_2}{a_1})" />
</div>
This works well in 2 dimensions but it doesn't scale to multiple dimensions: for example in 3 dimensions, in what plane do we measure the angle? Which is why the direction cosines where invented: this is a new vector taking the cosine of the original vector to each axis of the space.

<div align="center">
<img src="https://latex.codecogs.com/gif.latex?(\cos(\alpha_1),&space;\cos(\alpha_2),&space;...,&space;\cos(\alpha_i),&space;...,&space;\cos(\alpha_n))" title="(\cos(\alpha_1), \cos(\alpha_2), ..., \cos(\alpha_i), ..., \cos(\alpha_n))" /></div>

We know from geometry that the cosine of an angle is defined by:
<div align="center">
<img src="https://latex.codecogs.com/gif.latex?\cos(\alpha)&space;=&space;\frac{\text{adjacent}}{\text{hypothenuse}}" title="\cos(\alpha) = \frac{\text{adjacent}}{\text{hypothenuse}}" /></div>

So, the definition of the direction cosine becomes
<div align="center">
<img src="https://latex.codecogs.com/gif.latex?(\frac{a_1}{\lvert\lvert{\mathbf{a}}\lvert\lvert},&space;\frac{a_2}{\lvert\lvert{\mathbf{a}}\lvert\lvert},&space;...,&space;\frac{a_i}{\lvert\lvert{\mathbf{a}}\lvert\lvert},&space;...,&space;\frac{a_n}{\lvert\lvert{\mathbf{a}}\lvert\lvert})" title="(\frac{a_1}{\lvert\lvert{\mathbf{a}}\lvert\lvert}, \frac{a_2}{\lvert\lvert{\mathbf{a}}\lvert\lvert}, ..., \frac{a_i}{\lvert\lvert{\mathbf{a}}\lvert\lvert}, ..., \frac{a_n}{\lvert\lvert{\mathbf{a}}\lvert\lvert})" />
</div>

This direction cosine is a vector ![](https://latex.codecogs.com/gif.latex?%5Cmathbf%7Bv%7D) with length 1 in the same direction as the original vector. This can be simply determined from the definition of the magnitude of a vector:

<div align="center">
<img src="https://latex.codecogs.com/gif.latex?\begin{aligned}&space;\lvert\lvert{\mathbf{v}}\lvert\lvert&=\sqrt{(\frac{a_1}{\lvert\lvert{\mathbf{a}}\lvert\lvert})^2&space;&plus;&space;(\frac{a_2}{\lvert\lvert{\mathbf{a}}\lvert\lvert})^2&space;&plus;&space;...&space;&plus;&space;(\frac{a_i}{\lvert\lvert{\mathbf{a}}\lvert\lvert})^2&space;&plus;&space;...&space;&plus;&space;(\frac{a_n}{\lvert\lvert{\mathbf{\mathbf{a}}}\lvert\lvert})^2}\\&space;&=\sqrt{\frac{(a_1)^2&plus;(a_2)^2&plus;...&plus;(a_i)^2&plus;...&plus;(a_n)^2}{\lvert\lvert{\mathbf{a}}\lvert\lvert^2}}\\&space;&=\frac{\sqrt{(a_1)^2&plus;(a_2)^2&plus;...&plus;(a_i)^2&plus;...&plus;(a_n)^2}}{\lvert\lvert{\mathbf{a}}\lvert\lvert}\\&space;&=\frac{\lvert\lvert{\mathbf{a}}\lvert\lvert}{\lvert\lvert{\mathbf{a}}\lvert\lvert}\\&space;&=1\\&space;\end{aligned}" title="\begin{aligned} \lvert\lvert{\mathbf{v}}\lvert\lvert&=\sqrt{(\frac{a_1}{\lvert\lvert{\mathbf{a}}\lvert\lvert})^2 + (\frac{a_2}{\lvert\lvert{\mathbf{a}}\lvert\lvert})^2 + ... + (\frac{a_i}{\lvert\lvert{\mathbf{a}}\lvert\lvert})^2 + ... + (\frac{a_n}{\lvert\lvert{\mathbf{\mathbf{a}}}\lvert\lvert})^2}\\ &=\sqrt{\frac{(a_1)^2+(a_2)^2+...+(a_i)^2+...+(a_n)^2}{\lvert\lvert{\mathbf{a}}\lvert\lvert^2}}\\ &=\frac{\sqrt{(a_1)^2+(a_2)^2+...+(a_i)^2+...+(a_n)^2}}{\lvert\lvert{\mathbf{a}}\lvert\lvert}\\ &=\frac{\lvert\lvert{\mathbf{a}}\lvert\lvert}{\lvert\lvert{\mathbf{a}}\lvert\lvert}\\ &=1\\ \end{aligned}" />
</div>
This vector with length 1 is also called the *unit vector*.

Try it yourself:
[Vector Direction interactive](https://sergedesmedt.github.io/MathOfNeuralNetworks/VectorProperties.html#learn_vector_prop_direction)

### Operations with Vectors 
#### Sum and difference of two Vectors
Say we have two vectors:

<div align="center">
<img src="https://latex.codecogs.com/gif.latex?\begin{aligned}&space;\mathbf{a}&space;&=&space;(a_1,&space;a_2,&space;...,&space;a_n),&space;\text{&space;in&space;}\mathbb{R}^n\\&space;\mathbf{b}&space;&=&space;(b_1,&space;b_2,&space;...,&space;b_n),&space;\text{&space;in&space;}\mathbb{R}^n&space;\end{aligned}" title="\begin{aligned} \mathbf{a} &= (a_1, a_2, ..., a_n), \text{ in }\mathbb{R}^n\\ \mathbf{b} &= (b_1, b_2, ..., b_n), \text{ in }\mathbb{R}^n \end{aligned}" />
</div>

The sum of two vectors is the vector resulting from the addition of the components of the orignal vectors. 

<div align="center">
<img src="https://latex.codecogs.com/gif.latex?\begin{aligned}&space;\mathbf{c}&space;&=&space;\mathbf{a}&space;&plus;&space;\mathbf{b}\\&space;&=&space;(a_1&space;&plus;&space;b_1,&space;a_2&space;&plus;&space;b_2,&space;...,&space;a_n&space;&plus;&space;b_n)&space;\end{aligned}" title="\begin{aligned} \mathbf{c} &= \mathbf{a} + \mathbf{b}\\ &= (a_1 + b_1, a_2 + b_2, ..., a_n + b_n) \end{aligned}" />
</div>

Try it yourself:
[Sum of vectors interactive](https://sergedesmedt.github.io/MathOfNeuralNetworks/VectorMath.html#learn_vector_math_sum)

The difference of two vectors is the vector resulting from the differences of the components of the original vectors:

<div align="center">
<img src="https://latex.codecogs.com/gif.latex?\begin{aligned}&space;\mathbf{c}&space;&=&space;\mathbf{a}&space;-&space;\mathbf{b}\\&space;&=&space;(a_1&space;-&space;b_1,&space;a_2&space;-&space;b_2,&space;...,&space;a_n&space;-&space;b_n)&space;\end{aligned}" title="\begin{aligned} \mathbf{c} &= \mathbf{a} - \mathbf{b}\\ &= (a_1 - b_1, a_2 - b_2, ..., a_n - b_n) \end{aligned}" />
</div>

Try it yourself:
[Difference of vectors interactive](https://sergedesmedt.github.io/MathOfNeuralNetworks/VectorMath.html#learn_vector_math_diff)


#### Scalar multiplication 
Say we have a vector ![](https://latex.codecogs.com/gif.latex?%5Cmathbf%7Ba%7D) and a scalar ![](https://latex.codecogs.com/gif.latex?%5Clambda) (a number):

<div align="center">
<img src="https://latex.codecogs.com/gif.latex?\begin{aligned}&space;\mathbf{a}&space;&=&space;(a_1,&space;a_2,&space;...,&space;a_n),&space;\text{&space;in&space;}\mathbb{R}^n\\&space;\lambda&space;\end{aligned}" title="\begin{aligned} \mathbf{a} &= (a_1, a_2, ..., a_n), \text{ in }\mathbb{R}^n\\ \lambda \end{aligned}" />
</div>


A vector multiplied by a scalar is the vector resulting of the multiplication of each component of the original vector by the scalar:
<div align="center">
<img src="https://latex.codecogs.com/gif.latex?\begin{aligned}&space;\mathbf{c}&space;&=&space;\lambda&space;\mathbf{a}\\&space;&=&space;(\lambda&space;a_1,&space;\lambda&space;a_2,&space;...,&space;\lambda&space;a_n)&space;\end{aligned}" title="\begin{aligned} \mathbf{c} &= \lambda \mathbf{a}\\ &= (\lambda a_1, \lambda a_2, ..., \lambda a_n) \end{aligned}" />
</div>


Try it yourself:
[Scalar Multiplication for vectors interactive](https://sergedesmedt.github.io/MathOfNeuralNetworks/VectorMath.html#learn_vector_math_scalarmult)

#### Dot product 

The dot-product is the scalar (a real number) resulting of taking the sum of the products of the corresponding components of two vectors:

<div align="center">
<img src="https://latex.codecogs.com/gif.latex?\begin{aligned}&space;\mathbf{c}&space;&=&space;\mathbf{a}&space;\cdot&space;\mathbf{b}\\&space;&=&space;a_1&space;b_1&space;&plus;&space;a_2&space;b_2&space;&plus;&space;...&space;&plus;&space;a_n&space;b_n\\&space;&=&space;\sum_{i=1}^{n}&space;a_ib_i&space;\end{aligned}" title="\begin{aligned} \mathbf{c} &= \mathbf{a} \cdot \mathbf{b}\\ &= a_1 b_1 + a_2 b_2 + ... + a_n b_n\\ &= \sum_{i=1}^{n} a_ib_i \end{aligned}" />
</div>


Geometrically, this is equal to the multiplication of the magnitude of the vectors with the cosine of the angle between the vectors:
<div align="center">
<img src="https://latex.codecogs.com/gif.latex?\begin{aligned}&space;\mathbf{c}&space;&=&space;\mathbf{a}&space;\cdot&space;\mathbf{b}\\&space;&=&space;{\lvert\lvert{\mathbf{a}}\lvert\lvert}\text{&space;}{\lvert\lvert{\mathbf{b}}\lvert\lvert}\text{&space;}cos(\alpha)\\&space;\end{aligned}" title="\begin{aligned} \mathbf{c} &= \mathbf{a} \cdot \mathbf{b}\\ &= {\lvert\lvert{\mathbf{a}}\lvert\lvert}\text{ }{\lvert\lvert{\mathbf{b}}\lvert\lvert}\text{ }cos(\alpha)\\ \end{aligned}" />
</div>


There are several proofs for this, which I will not repeat here. The article on [SVM's](https://www.svm-tutorial.com/2014/11/svm-understanding-math-part-2/) has one, and [this article on the dot-product](http://tutorial.math.lamar.edu/Classes/CalcII/DotProduct.aspx) also contains a very understadable proof.

From this last definition we can make two important assertions.

First, if, for two vectors with a magnitude not zero, the dot product is zero, then those vectors are perpendicular. Because the magnitude of the vectors is not zero, the dot product can only be zero if the![](https://latex.codecogs.com/gif.latex?cos%28%5Calpha%29) is zero. And thus if the angle ![](https://latex.codecogs.com/gif.latex?%5Calpha) between the vectors is either 90 or -90 degrees. And thus only if the two vectors are perpendicular. (Try it out in the interactive example below!)

Second, if one of the two vectors has a magnitude of 1, then the dot product equals [the projection of the second vector on this unit vector](http://www.math.ryerson.ca/~danziger/professor/MTH141/Handouts/projections.pdf). (Try it out in the interactive example below!). This can also easily be seen:

<div align="center">
<img src="https://latex.codecogs.com/gif.latex?\begin{aligned}&space;\text{if&space;}{\lvert\lvert{a}\lvert\lvert}&space;=&space;1\text{&space;then&space;}\\&space;c&space;&=&space;a&space;\cdot&space;b\\&space;&=&space;{\lvert\lvert{a}\lvert\lvert}\text{&space;}{\lvert\lvert{b}\lvert\lvert}\text{&space;}cos(\alpha)\\&space;&=&space;{\lvert\lvert{b}\lvert\lvert}\text{&space;}cos(\alpha)\\&space;\end{aligned}" title="\begin{aligned} \text{if }{\lvert\lvert{a}\lvert\lvert} = 1\text{ then }\\ c &= a \cdot b\\ &= {\lvert\lvert{a}\lvert\lvert}\text{ }{\lvert\lvert{b}\lvert\lvert}\text{ }cos(\alpha)\\ &= {\lvert\lvert{b}\lvert\lvert}\text{ }cos(\alpha)\\ \end{aligned}" />
</div>


Try it yourself:
[Dot Product interactive](https://sergedesmedt.github.io/MathOfNeuralNetworks/DotProduct.html#learn_dotproduct)

The dot product is **commutative**:
$$\mathbf{a} \cdot \mathbf{b} = \mathbf{b} \cdot \mathbf{a}$$

Try it yourself:
[Dot Product commutativity interactive](https://sergedesmedt.github.io/MathOfNeuralNetworks/DotProduct.html#learn_dotproduct_commutative)

The dot product is **distributive**:
$$\mathbf{a} \cdot (\mathbf{b}+\mathbf{c}) = \mathbf{a} \cdot \mathbf{b} + \mathbf{a} \cdot \mathbf{c}$$

Try it yourself:
[Dot Product distributivity interactive](https://sergedesmedt.github.io/MathOfNeuralNetworks/DotProduct.html#learn_dotproduct_distributive)

The **scalar multiplication** property:
$$(\lambda\mathbf{a}) \cdot \mathbf{b} = \mathbf{a} \cdot (\lambda\mathbf{b}) = \lambda(\mathbf{a} \cdot \mathbf{b})$$

Okay, now you know what a Vector is. Let us continue our journey.

## Linearely seperable features

So, we where saying: The sum of the products of the components of the feature and weight vector is equal to the Dot-product.

The perceptron formula now becomes:
$$
f(x)  =  
  \begin{cases}
 1 & \text{if } \mathbf{w} \cdot \mathbf{x} > b\\
 0 & \text{otherwise} 
  \end{cases}
$$

Remember what we did originally: we took a linear combination of the input values $[x_1, x_2, ..., x_i, ..., x_n]$ which resulted in the formula:
$$w_1x_1 + w_2x_2 + ... + w_ix_i + ... + w_nx_n > b$$

You may remember a similar formula from your mathematics class: the equation of a hyperplane:
$$w_1x_1 + w_2x_2 + ... + w_ix_i + ... + w_nx_n = b$$

Or, with dot product notation:
$$\mathbf{w} \cdot \mathbf{x} = b$$

So, the equation $\mathbf{w} \cdot \mathbf{x} > b$ defines all the points on one side of the hyperplane, and $\mathbf{w} \cdot \mathbf{x} <= b$ all the points on the other side of the hyperplane and on the hyperplane itself. This happens to be the very definition of ["linear seperability"](https://en.wikipedia.org/wiki/Linear_separability) 

Thus, the perceptron allows us to seperate our feature space in two convex half spaces.


## A Hyper-what? 

Let us step back for a while: what is this hyperplane and convex half spaces stuff?

### Hyperplanes in one dimension: the equation of a line
#### A line through the origin
Never mind this hyperplane stuff. Let's get back to 2-dimensional space and write the equation of a line as most people know it:
$$ax + by + c = 0$$
Let us even simplify this more and consider just:
$$ax + by = 0$$

Now, if we fix the values for $a$ and $b$ and solve the equation for various $x$ and $y$ and plot these values we see that the resulting points are all on a line.

If we consider $a$ and $b$ as the components of a vector $\mathbf{l}$, and $x$ en $y$ as the components of a vector $\mathbf{p}$, then the above is the dot product:
$$\begin{aligned}
\mathbf{l} &= (a, b), \text{ in }\mathbb{R}^2\\
\mathbf{p} &= (x, y), \text{ in }\mathbb{R}^2\\
\end{aligned}$$
Then:
$$\begin{aligned}
ax + by &= 0\\
\mathbf{l} \cdot \mathbf{p} &= 0\\
\end{aligned}$$

So, how come that setting our dot product to zero in two dimensions appears to be a line through the origin? 

Remember that when we discussed the dot product, we came to the conclusion that if the dot product is zero for two vectors with magnitude not zero, then those vectors need to be perpendicular. So, if we fix the coordinates of the vector $\mathbf{l}$, thus fix the values $a$ and $b$, then the above equation resolves to all vectors perpendicular to the vector $\mathbf{l}$, which equals to all points on the line perpendicular to the vector $\mathbf{l}$ and going through the origin.

So, vector $\mathbf{l}$ determines the direction of the line: the vector is perpendicular to the direction of the line.

Try it yourself:
[A line through the origin interactive](https://sergedesmedt.github.io/MathOfNeuralNetworks/LineMath.html#learn_linemath_throughorigin)

#### A line at some distance from the origin

Above, we simplified our equation resulting in the equation of a line through the origin. Let us consider the full equation again:

$$ax + by + c = 0$$

Rearranging a bit:

$$ax + by = -c$$

And replacing $-c$ with $d$:

$$ax + by = d$$

Here also, we can consider replacing this with the dot product of vectors:

$$\begin{aligned}
\mathbf{l} &= (a, b), \text{ in }\mathbb{R}^2\\
\mathbf{p} &= (x, y), \text{ in }\mathbb{R}^2\\
\end{aligned}$$

Then:

$$\begin{aligned}
ax + by &= d\\
\mathbf{l} \cdot \mathbf{p} &= d\\
&= {\lvert\lvert{\mathbf{l}}\lvert\lvert}\text{ }{\lvert\lvert{\mathbf{p}}\lvert\lvert}\text{ }cos(\alpha)
\end{aligned}$$

We can "normalize" this equation by dividing it through the length of $\mathbf{l}$, resulting in the dot product of the unit vector in the direction of $\mathbf{l}$: $\mathbf{u}$ and the vector $\mathbf{p}$:

$$\begin{aligned}
\frac{\mathbf{l} \cdot \mathbf{p}}{\lvert\lvert{\mathbf{l}}\lvert\lvert} &= \frac{d}{\lvert\lvert{\mathbf{l}}\lvert\lvert}\\
\mathbf{u} \cdot \mathbf{p} &= \frac{d}{\lvert\lvert{\mathbf{l}}\lvert\lvert}\\
&= {\lvert\lvert{\mathbf{u}}\lvert\lvert}\text{ }{\lvert\lvert{\mathbf{p}}\lvert\lvert}\text{ }cos(\alpha)\\
&= {\lvert\lvert{\mathbf{p}}\lvert\lvert}\text{ }cos(\alpha)
\end{aligned}$$

And as seen above when discussing the dot product, this equals the magnitude of the projection of vector $\mathbf{p}$ onto the unit vector in the direction of $\mathbf{m}$. So, the above equation gives all vectors whose projection on the unit vector in the direction of $\mathbf{m}$ equals $d/{\lvert\lvert{\mathbf{m}}\lvert\lvert}$
This equals all vectors to points on the line perpendicular to $\mathbf{m}$ and at a distance $d/{\lvert\lvert{\mathbf{m}}\lvert\lvert}$ from the origin.

Try it yourself:
[A line at some distance from the origin interactive](https://sergedesmedt.github.io/MathOfNeuralNetworks/LineMath.html#learn_linemath_atdistancefromorigin)

### Extending to 3-dimensional space: equation of a plane

$$ax + by + cz= 0$$

Again, through vectors:
If we consider the components $a$, $b$ and $c$ as a vector $\mathbf{m}$, and $x$, $y$ and $z$ as a vector $\mathbf{p}$, then the above is the dot product:
$$\begin{aligned}
\mathbf{m} &= (a, b, c), \text{ in }\mathbb{R}^3\\
\mathbf{p} &= (x, y, z), \text{ in }\mathbb{R}^3\\
\end{aligned}$$
Then:
$$\begin{aligned}
ax + by + cz &= 0\\
\mathbf{m} \cdot \mathbf{p} &= 0\\
\end{aligned}$$

Again, if the dot product is zero for two vectors with magnitude not zero, then those vectors need to be perpendicular. So, if we fix the coordinates of the vector $\mathbf{m}$, thus fix the values $a$, $b$ and $c$, then the above equation resolves to all vectors perpendicular to the vector $\mathbf{m}$, which equals to all points in the plane perpendicular to the vector $\mathbf{m}$ and going through the origin.

A similar line of thought can be followed for the equation:

$$ax + by + cz= d$$

Here also, we can consider replacing this with the dot product of vectors:

$$\begin{aligned}
\mathbf{m} &= (a, b, c), \text{ in }\mathbb{R}^3\\
\mathbf{p} &= (x, y, z), \text{ in }\mathbb{R}^3\\
\end{aligned}$$

$$\begin{aligned}
ax + by + cz &= d\\
\mathbf{m} \cdot \mathbf{p} &= d\\
&= {\lvert\lvert{\mathbf{m}}\lvert\lvert}\text{ }{\lvert\lvert{\mathbf{p}}\lvert\lvert}\text{ }cos(\alpha)
\end{aligned}$$

Normalizing by dividing through the length of $\mathbf{m}$, with $\mathbf{u}$ being the unit vector in the direction of $\mathbf{m}$:

$$\begin{aligned}
\frac{\mathbf{m} \cdot \mathbf{p}}{\lvert\lvert{\mathbf{m}}\lvert\lvert} &= \frac{d}{\lvert\lvert{\mathbf{m}}\lvert\lvert}\\
\mathbf{u} \cdot \mathbf{p} &= \frac{d}{\lvert\lvert{\mathbf{m}}\lvert\lvert}\\
&= {\lvert\lvert{\mathbf{u}}\lvert\lvert}\text{ }{\lvert\lvert{\mathbf{p}}\lvert\lvert}\text{ }cos(\alpha)\\
&= {\lvert\lvert{\mathbf{p}}\lvert\lvert}\text{ }cos(\alpha)
\end{aligned}$$

And as seen above when discussing the dot product, this equals the magnitude of the projection of vector $\mathbf{p}$ onto the unit vector in the direction of $\mathbf{m}$. So, the above equation gives all vectors whose projection on the unit vector in the direction of $\mathbf{m}$ equals $d/\lvert\lvert{\mathbf{m}}\lvert\lvert$
This equals all vectors to points in the plane perpendicular to $\mathbf{m}$ and at a distance $d/\lvert\lvert{\mathbf{m}}\lvert\lvert$ from the origin.

### Extending to n-dimensional space: equation of a hyper-plane

In 3-dimensional space, we defined the equation of a plane as:
$$ax + by + cz= d$$

If we use the symbols we are customed to in our discussion of the percpetron rule, we can write:
$$w_1x_1 + w_2x_2 + w_3x_3= b$$
*This may be a bit confusing, but the $b$ in this last equation has nothing to do with the $b$ in the first equation*

If we extend this to multiple dimensions, we get:
$$\begin{aligned}
w_1x_1 + w_2x_2 + w_ix_i + ... + w_nx_n &= b\\
&= \sum_{i=1}^{n} w_ix_i
\end{aligned}$$

In multi-dimensional space we talk about hyper-planes: like a plane is a line in 3-dimensional space, a hyper-plane is a plane n multi-dimensional space.

## Linear Sepera-what-ility ?

Ok, lets go back to the definition of the perceptron:
$$
f(x)  =  
  \begin{cases}
 1 & \text{if } \mathbf{w} \cdot \mathbf{x} > b\\
 0 & \text{otherwise} 
  \end{cases}
$$

So, we output 1 if the dot product of the feature vector $\mathbf{x}$ and weight vector $\mathbf{w}$ is larger then $b$, and zero $\text{otherwise}$. But what is $\text{otherwise}$ ?
Well $\text{otherwise}$ is:
$$\mathbf{w} \cdot \mathbf{x} <= b$$

Ah, equal to or less then $b$. We know the *equal to* part, that is our above hyper-plane.
$$\mathbf{w} \cdot \mathbf{x} = b$$

So what remains is the *less than* part
$$\mathbf{w} \cdot \mathbf{x} < b$$

It just so happens the inequality equations define two so called half-spaces: one half space above the hyper-plane and one half-space below the hyper-plane.

### Linear separability and half-spaces

Let us again take the equation of a hyperplane:
$$\begin{aligned}
w_1x_1 + w_2x_2 + w_ix_i + ... + w_nx_n &= b\\
\sum_{i=1}^{n} w_ix_i &= b\\
\mathbf{w} \cdot \mathbf{x} &= b
\end{aligned}$$

This hyperplane seperates the space $\mathbb{R}^n$ in two convex sets of points, hence the name half-space.

One half-space is represented by the equation
$$\mathbf{w} \cdot \mathbf{x} > b$$

The other by
$$\mathbf{w} \cdot \mathbf{x}  < b$$

Let us analize the first equation. First, convert it to a vector representation:

$$\begin{aligned}
\mathbf{w} \cdot \mathbf{x}  &> b\\
{\lvert\lvert{\mathbf{w}}\lvert\lvert}\text{ }{\lvert\lvert{\mathbf{x}}\lvert\lvert}\text{ }cos(\alpha) &> b
\end{aligned}$$

Normalizing:
$${\lvert\lvert{\mathbf{x}}\lvert\lvert}\text{ }cos(\alpha) > \frac{b}{\lvert\lvert{\mathbf{w}}\lvert\lvert}$$

So, the geometric interpretation is the set of all vectors to points with a projection on the unit vector in the direction of the weight vector $\mathbf{w}$ *larger* then some constant value $\frac{b}{\lvert\lvert{\mathbf{w}}\lvert\lvert}$.

A similar reasoning can be made for the equation $\mathbf{w} \cdot \mathbf{x} < b$ : it results in the set of vectors to points with a projection on the unit vector in the direction of the weight vector $W$ *smaller* then some constant value $\frac{b}{\lvert\lvert{\mathbf{w}}\lvert\lvert}$.

We can imagine these two sets as being the set of all points on either one side or the other side of the hyper-plane.

These half spaces are also convex. 

The definition of convex goes as follows (from Wikipedia):
> in a Euclidean space, a convex region is a region where, for every pair of points within the region, every point on the straight line segment that joins the pair of points is also within the region.

Mathematically this can be more rigourously be described as:
> A set $\mathbf{C}$ in $\mathbf{S}$ is said to be convex if, for all points $A$ and $B$ in $\mathbf{C}$ and all $\lambda$ in the interval $(0, 1)$, the point $(1 −  {\lambda})A  +  {\lambda}B$ also belongs to $C$.

The equation $(1 −  {\lambda})A  +  {\lambda}B$ is actually the equation of a line segment between points $A$ and $B$. We can see this from following:

Let us define two points in the multi-dimensional space:
$$\begin{aligned}
A &= (a_1, a_2, ..., a_i, ..., a_n), \text{ in }\mathbb{R}^n\\
B &= (b_1, b_2, ..., b_i, ..., b_n), \text{ in }\mathbb{R}^n\\
\end{aligned}$$
Then a line segment going from point A to point B can be defined as:
$$r = \vec{OA} + \lambda \vec{AB}$$
with $\vec{OA}$ being the vector going from the origin $O$ to point $A$ and $\vec{AB}$ the vector going from point $A$ to point $B$. $\lambda$ is in the interval $(0, 1)$
This is simply the adition of the vector $\mathbf{a}$ with a part of the vector going from point $A$ to point $B$

Try it yourself:
[Line segment interactive](https://sergedesmedt.github.io/MathOfNeuralNetworks/ConvexityDefinition.html#learn_convexity_linesegment)

We know from the section on vector math above that the vector going from  $A$ to $B$ is equal to $\mathbf{b}-\mathbf{a}$ and thus we can write:
$$\begin{aligned}
r &= \vec{OA} + \lambda \vec{AB}\\
&= \mathbf{a} + {\lambda}(\mathbf{b}-\mathbf{a}) \\
&= \mathbf{a} + {\lambda}\mathbf{b}-{\lambda}\mathbf{a} \\
&= (1-{\lambda})\mathbf{a} + {\lambda}\mathbf{b} \\
\end{aligned}$$

Now we can proof the half spaces separated by the hyper-plane are convex:

Let us consider the upper half plane. For any two vectors $\mathbf{x}$, $\mathbf{y}$ in that half space we have:
$$\begin{aligned}
\mathbf{w} \cdot \mathbf{x} > d\\
\mathbf{w} \cdot \mathbf{y} > d
\end{aligned}$$

If the half space is convex, then each point resulting from the equation
$$(1-{\lambda})\mathbf{x} + {\lambda}\mathbf{y}$$
must belong to the half space, which is equal to saying that every point on the line segment between the endpoints $X$ and $Y$ of the vectors must belong to the half space. Substituation in the equation of the half space gives:
$$\mathbf{w} \cdot ((1-{\lambda})\mathbf{x} + {\lambda}\mathbf{y}) > d$$
Then, by the distributive and scalar multiplication properties of the dot product we can re-arrange to:
$$\begin{aligned}
\mathbf{w} \cdot (1-{\lambda})\mathbf{x} + \mathbf{w}\cdot {\lambda}\mathbf{y}  &> d\\
\mathbf{w} \cdot (1-{\lambda})\mathbf{x} + \mathbf{w} \cdot {\lambda}\mathbf{y}  - d &> 0\\
\mathbf{w} \cdot (1-{\lambda})\mathbf{x} + \mathbf{w} \cdot {\lambda}\mathbf{y} &> d\\
\end{aligned}$$
Since we now that $0 < {\lambda} < 1$ and $\mathbf{w} \cdot \mathbf{x} > d$ and also $\mathbf{w} \cdot \mathbf{y} > d$ then the above inequality must also hold true. And thus we have proven that the half space is indeed convex.

Try it yourself:
[Convex interactive](https://sergedesmedt.github.io/MathOfNeuralNetworks/ConvexityDefinition.html#learn_convexity_convex)
[Not Convex interactive](https://sergedesmedt.github.io/MathOfNeuralNetworks/ConvexityDefinition.html#learn_convexity_concave)


## As I was saying: Linearily seperable ...

Thus, getting back at our formula for the preceptron:

$$
f(x)  =  
  \begin{cases}
 1 & \text{if } \mathbf{w} \cdot \mathbf{x} > b\\
 0 & \text{otherwise} 
  \end{cases}
$$

We can now see how this formula divides our feature-space in two *convex* half spaces. Mind the word *convex* here: it does not just divide the feature space in two subspaces, but in two convex subspaces.

This means that we cannot seperate feature points into classes that are not convex. Visually in two-dimensional space, we cannot seperate features like this:

![Not linariliy seperable points](https://sergedesmedt.github.io/MathOfNeuralNetworks/Resources/LinearSeperability_NotSeperable.PNG)

If you've been reading about the perceptron allready, you may have read about the fact that it cannot solve the XOR problem: it cannot seperate the inputs according to the XOR function. That is exactly because of the above: the outcome is not convex, hence is not linearily seperable.

![XOR function](https://sergedesmedt.github.io/MathOfNeuralNetworks/Resources/LinearSeperability_XORFunction.PNG)

If you search the internet for the formula of the Rosenblatt perceptron, you will also find some in which the factor $b$ is no longer present. What happened to it? Some re-arrangement of the components of the addition make it end up in the dot product:

$$\begin{aligned}
\mathbf{w} \cdot \mathbf{x}  &> b\\
w_1x_1 + w_2x_2 + w_ix_i + ... + w_nx_n &> b\\
w_1x_1 + w_2x_2 + w_ix_i + ... + w_nx_n - b &> 0\\
w_1x_1 + w_2x_2 + w_ix_i + ... + w_nx_n + (-b)1 &> 0\\
\end{aligned}$$

Now, we can define $b' = -b$
$$w_1x_1 + w_2x_2 + w_ix_i + ... + w_nx_n + (b')1 > 0$$

Finally, we can take the factor 1 inside the feature vector by defining $x_0 = 1$ and $b'$ inside the weight vector by defining $w_0 = b'$. This lets us write:
$$w_0x_0 + w_1x_1 + w_2x_2 + w_ix_i + ... + w_nx_n > 0$$

And by taking $w_0$ and $x_0$ inside the vector:
$$
\begin{aligned}
\mathbf{x'}&=[x_0, x_1, x_2, ..., x_i, ..., x_n]\\
\mathbf{w'}&=[w_0, w_1, w_2, ..., w_i, ..., w_n]
\end{aligned}
$$

We can now write:
$$
f(x)  =  
  \begin{cases}
 1 & \text{if } \mathbf{w'} \cdot \mathbf{x'} > 0\\
 0 & \text{otherwise} 
  \end{cases}
$$

So we have a function which classifies our features into two classes by multiplying them with a weight and if the result is positive assigns them a label "1" and "0" otherwise. 

Further in the article I will leave the accent of the vectors and just write $\mathbf{w}$ and $\mathbf{x}$ which have the $w_0$ and $x_0$ included.

Try it yourself:
[Perceptron math interactive](https://sergedesmedt.github.io/MathOfNeuralNetworks/PerceptronMath.html#learn_perceptron)

This *assigning them a label "1" and "0" otherwise* is the definition of the Heaviside Step Function.

## The Heaviside Step Function

The Heaviside step function is also called the unit step function and is given by:
$$
H(n)  =  
  \begin{cases}
 1 \text{, } n >= 0\\
 0 \text{, } n < 0\\
  \end{cases}
$$

If you search the internet for the definition of the Heaviside step function, you may find alternative definitions which differ from the above on how the result of the function is defined  when $x=0$

The Heaviside step function is discontinuous. A function $f(x)$ is continuous if a small change of $x$ results in a small change in the outcome of the function. This is clearly not the case for the Heaviyside step function: if at 0 and moving to the negative side then the function outcome changes suddenly from 1 to 0.

I will not elaborate much more on this function not being continuous because it is not important for the discussion at hand. In a next article, when we discuss the ADALINE perceptron, I will get back to this.

## Learning the weights

We've covered a lot about how the perceptron classifies the features in two linearily seperable classes using the weight vector. But the big question is: if we have some samples of features for which we know the resulting class, how can we find the weights so that we can also classify unknown values of the feature vector? Or, how can we find the hyperplane sepeating the features?

This is where the perceptron learning rule comes in.

### The perceptron learning rule

First, we define the error $e$ as being the difference between the desired output $d$ and the effective output $o$ for an input vector $\mathbf{x}$ and a weight vector $\mathbf{w}$:
$$e = d-o$$
Then we can write the learning rule as:
$$\mathbf{w}_{i+1} = \mathbf{w}_{i} + e\mathbf{x}$$

In this $\mathbf{w}_{i+1}$ is the new weight vector, $\mathbf{w}_{i}$ is the current weight vector and $e$ is the current error. We initialize the weight vector with some random values, thus $\mathbf{w}_0$ has some random values. You will find similar definitions of the learning rule which also use a learning rate factor. As we will show later when we proof the convergence of the learning rule this factor is not really necessary. That is why we leave it out here.

Why does this work? First, let us analyse the error function:
$$e = d-o$$
As stated before, in this $d$ and $o$ are resp. the desired output and the effective output of the perceptron. We know from the definition of the preceptron that its output can take two values: either $1$ or $0$. Thus the error function can take following values:


|prediction|desired (d)| effective (o)|e|
|:-|:-:|:-:|:-:|
|correct|1|1|0
|correct|0|0|0
|wrong|0|1|-1
|wrong|1|0|1

From the above we can see that
1. We only change the weight vector $\mathbf{w}$ if the prediction made by the perceptron is wrong, because if it is correct the error amounts to zero.
2. If we incorrectly predict a feature to be above the hyperplane then the error is -1 and we subtract the feature vector from the weight vector.
3. If we incorrectly predict a feature to be below the hyperplane then the error is 1 and we add the feature vector to the weight vector.

Let's see what this gives geometrically. The following discussion gives an intuitive feel of what the learning algorithm does, but is by no means a mathematically rigourous discussion. We start with ignoring the threshold factor of the vectors: that is, we ignore $w_0$ and $x_0$.


So, we are left with the factors determining the direction of the seperating hyperplane. Let us now plot some examples and see what happens.

#### Case 1: Desired result is 0 but 1 was predicted

The error $e$ is -1, so we need to subtract the new feature vector from the current weight vector to get the new weight vector:
$$\mathbf{w}_{i+1} = \mathbf{w}_{i} - \mathbf{x}$$

Remember that the weight vector is actually perpendicular to the hyperplane. The result of subtracting the incorrectly classified vector from the weight vector is a rotation of the separating hyperplane in the direction of the incorrectly classified point. In other words, we rotate the separating hyperplane in such a way that our newly learned point is closer to the half-space it belongs in.

#### Case 2: Desired result is 1 but 0 was predicted

The error $e$ is 1, so we need to add the new feature vector to the current weight vector to get the new weight vector:
$$\mathbf{w}_{i+1} = \mathbf{w}_{i} + \mathbf{x}$$

The result of adding the vector to the weight vector is a rotation of the separating hyperplane in the direction of the incorrectly classified point. In other words, we rotate the separating hyperplane in such a way that our newly learned point is closer to the half-space it belongs in.

Try it yourself:
[Perceptron Learning interactive](https://sergedesmedt.github.io/MathOfNeuralNetworks/PerceptronLearningMath.html#learn_perceptron_learningrule_animation)

## Convergence of the learning rule.

The above gives an intuïtive feel of what makes the learning rule work, but is not a mathematical prove. It can be proven mathematically that the perceptron rule will converge to a solution in a finite number of steps if the samples given are linearily seperable.

Read that sentence again please. First, we talk about a finite number of steps but we don't now what that number is up front ==is dit correct?==. Second, this is only true if the samples given are linearly seperable. Thus, if they are *not* linearly seperable we can keep on learning and have no idea when to stop !!!

I will not repeat the proof here because it would just be repeating some information you can find on the web. Second, the Rosenblatt perceptron has some problems which make it only interesting for historical reasons. If you are interested, look in the references section for some very understandable proofs go this convergence. Of course, if anyone wants to see it here just leave a comment.

## Wrap up

### Basic formula of the Rosenblatt Perceptron

The basic formula classifies the features by weighting them into two seperate classes.
We have seen that the way this is done, is by comparing the dot product of the feature vector $\mathbf{x}$ and the weight vector $\mathbf{w}$ with some fixed value $b$. If the dot product is larger then this fixed value, then we classisify them info one class by assigning them a label 1, otherwise we put them into the other class by assigning them a label 0.

$$
f(x)  =  
  \begin{cases}
 1 & \text{if } (\mathbf{w} \cdot \mathbf{x} - b) > 0\\
 0 & \text{otherwise} 
  \end{cases}
$$

### Behaviour of the Rosenblat Perceptron

Because the formula of the perceptron is basically a hyperplane, we can only classify things into two classes which are lineary seperable. A first class with things above the hyper-plane and a second class with things below the hyper-plane.

### Formalising some things: a few definitions

We've covered a lot of ground here, but without using a lot of the lingo surrounding perceptrons, neural networks and machine learning in general. There was already enough lingo with the mathematics that I didn't want to bother you with even more definitions.

However, once we start diving deeper we'll start uncovering some pattern / structure in the way we work. At that point, it will be interesting to have some definitions which allow us to define steps in this pattern.

So, here are some definitions:
  
**Feed forward single layer neural network**

What we have now is a *feed forward single layer neural network*:

*Neural Network*
A neural network is a group of nodes which are connected to each other. Thus, the output of certain nodes serves as input for other nodes: we have a *network* of nodes. The nodes in this network are modelled on the working of *neurons* in our brain, thus we speak of a *neural network*. In this article our neural network had one node: the perceptron.

*Single Layer*
In a neural network, we can define multiple layers simply by using the output of preceptrons as the input for other perceptrons. If we make a diagram of this we can view the perceptrons as being organised in layers in which the output of a layer serves as the input for the next layer. 
![Layers in Neural Network](https://sergedesmedt.github.io/MathOfNeuralNetworks/Resources/NeuralNetwork.PNG)
In this article we also have a *single layer*.

*Feed Forward*
This stacking of layers on top of each other and the output of previous layers serving as the input for next layers results in *feed forward* networks. There is no feedback of upper layers to lower layers. There are no loops. For our single perceptron we also have no loops and thus we have a *feed forward* network.

**Integration function**
The calculation we make with the weight vector $W$ and the feature vector $X$ is called *the integration function*. In the Rosenblatt perceptron the integration function is the dot-product.

**Bias**
The offset $b$ with which we compare the result of the integration function is called *the bias*.
  
**Activation function (transfer function)**
The output we receive from the perceptron based on the calculation of the integration function is determined by the *activation function*. The activation function for the Rosenblatt perceptron is the Heaviside step function.
    
**Supervised learning**
Supervised learning is a type of learning in which we feed samples into our algorithm and tell it the result we expect. By doing this the neural network learns how to classify the examples. After giving it enough samples we expect to be able to give it new data which it will automatically classify correctly.

The opposite of this is *Unsupervised learning* in which we give some samples but without the expected result. The algorithm is then able to classify these examples correctly based on some common properties of the samples.

There are other types of learning like *reïnforcement learning* which we will not cover here.

**Online learning**
The learning algorithm of the Rosenblatt preceptron is an example of an *online learning* algorithm: with each new sample given the weight vector is updated;

The opposite of this is *batch learning* in which we only update the weight vector after having fed all samples to the learning algorithm. This may be a bit abstract here but we'll clarify this in later articles.

## What is wrong with the Rosenblatt perceptron?

The main problem of the Rosenblatt preceptron is its learning algorithm. Allthough it works, it only works for linear seperable data. If the data we want to classify is not linearily seperable, then we do not really have any idea on when to stop the learning and neither do we know if the found hyperplane somehow minimizes the wrongly classified data.

Also, let's say we have some data which is linearily seperable. There are several lines which can seperate this data:
![Candidate lines](https://sergedesmedt.github.io/MathOfNeuralNetworks/Resources/LinearSeperability_SeperableCandidateSolutions.PNG)

We would like to find the hyperplane which fits the samples best. That is, we would like to find a line similar to the following:
![Best line](https://sergedesmedt.github.io/MathOfNeuralNetworks/Resources/LinearSeperability_SeperableBestSolution.PNG)

There are of course mathematical tools which allow us to find this hyperplane. They basically all define some kind of error function and then try to minimize this error. The error function is typically defined as a function of the desired output and the effective output just like we did above. The minimization is done by calculating the derivative of this error function. And herein is the problem for the Rosenblatt preceptron. Because the output is defined by the Heaviside Step function and this function does not have a derivative, because it is not continuous, we cannot have a matematically rigourous learning method.

If the above is gong a little to fast, don't panic. In the next article about the ADALINE perceptron we'll dig deeper into error functions and derivation.

## References 

### Javascript libraries used in the *Try it yourself* pages

For the SVG illustrations I use the well known [D3.js](https://d3js.org) library
For databinding [Knockout.js](https://knockoutjs.com) is used
Mathematical formulas are displayed using [MathJax](https://www.mathjax.org)

### Vector Math

The inspiration for writing this article and a good introduction to vector math: [SVM - Understanding the math - Part 2](https://www.svm-tutorial.com/2014/11/svm-understanding-math-part-2/)

Some wikipedia articles on the basics of vectors and vector math:
[Euclidean vector](https://en.wikipedia.org/wiki/Euclidean_vector)
[Magnitude](https://en.wikipedia.org/wiki/Magnitude_(mathematics))
[Direction cosine](https://en.wikipedia.org/wiki/Direction_cosine)

An understandable proof of why the dot-product is also equal to he product of the length of the vectors with the cosine of the angle between the vectors:
[Proof of dot-product](http://tutorial.math.lamar.edu/Classes/CalcII/DotProduct.aspx)

### Hyperplanes and Linear Seperability

[Hyperplane](https://en.wikipedia.org/wiki/Hyperplane)
[Linear separability](https://en.wikipedia.org/wiki/Linear_separability)

Two math stackexchange Q&A's on the equation of a hyperplane:
[Hyperplane equation intuition / geometric interpretation](https://math.stackexchange.com/questions/2175925/hyperplane-equation-intuition-geometric-interpretation)
[Why is the product of a normal vector and a vector on the plane equal to the equation of the plane?](https://math.stackexchange.com/questions/1629491/why-is-the-product-of-a-normal-vector-and-a-vector-on-the-plane-equal-to-the-equ)

### Convexity

Definition of convexity: [Convex set](https://en.wikipedia.org/wiki/Convex_set)
Discussing convexity, we also discussed Line segments: [Line segment](https://en.wikipedia.org/wiki/Line_segment)

Proving a half-plane is convex: [How do I prove that half a plane is convex?](https://www.quora.com/How-do-I-prove-that-half-a-plane-is-convex)

A more in depth discussion of convexity: [Lecture 1 Convex Sets](https://ljk.imag.fr/membres/Anatoli.Iouditski/cours/convex/chapitre_1.pdf)

### Perceptron

Wikipedia on the perceptron: [Perceptron](https://en.m.wikipedia.org/wiki/Perceptron)
Another explanation of the perceptron: [The Simple Perceptron](http://aass.oru.se/~lilien/ml/seminars/2007_02_01b-Janecek-Perceptron.pdf)
A Peceptron is a special kind of [linear classifier](https://en.wikipedia.org/wiki/Linear_classifier)
Following article as an interesting view on what they call the duality of input and weight-space: [3. Weighted Networks – The Perceptron](http://page.mi.fu-berlin.de/rojas/neural/chapter/K3.pdf)

### Perceptron Learning

Following article gives another intuitive explanation on why the learning algorithm works: [Perceptron Learning Algorithm: A Graphical Explanation Of Why It Works](https://towardsdatascience.com/perceptron-learning-algorithm-d5db0deab975)

An animated gif of the perceptron learning rule: [Perceptron training without bias](https://commons.m.wikimedia.org/wiki/File:Perceptron_training_without_bias.gif)

### Convergence of the learning algorithm

This YouTube video presents a very understandable proof: [Lec-16 Perceptron Convergence Theorem](https://www.youtube.com/watch?v=tRG-OnnQ9g4)

A written version of the same proof can be found in this pdf: [CHAPTER 1 Rosenblatt’s Perceptron](https://www.pearsonhighered.com/assets/samplechapter/0/1/3/1/0131471392.pdf) By the way, there is much more inside that pdf then just the proof.


