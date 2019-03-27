# The Math behind the Perceptron: Part 1 - The Rosenblatt Perceptron

## Introduction

A lot of articles introduce the perceptron showing the basic mathematical formulas that define it, but without offering much of an explanation on what exactly makes it work.

And surely it is possible to use the perceptron without really understanding the basic math involved with it, but is it not also fun to see how all this math you learned in school can help you understand the perceptron, and in extension, neural networks?

I also got inspired for this article by a series of articles on [Support Vector Machines](https://www.svm-tutorial.com/svm-tutorial/math-svm-tutorial/), explaining the basic mathematical concepts involved, and slowly building up to the more complex mathematics involved. So that is my intention with this article and the accompaning code: show you the math envolved in the preceptron. And, if time permits, I will write articles all the way up to convolutional neural networks.

Of course, when explaining the math, the question is: when do you stop explaining? There is some math involved that is rather basic, like for example *what is a vector?*, *what is a cosine?*, etc... I will assume some basic knowledge of mathematics like you have some idea a what *a vector* is, you know the basics of geometry, etc... My assumptions will be arbitraty, so if you think i'm going too fast in some explanations just leave a comment.

So, let us get started.

### Setting some bounds

A perceptron basically takes some input values, called "features" and represented by the values $x_1, x_2, ... x_n$ in the following formula , multiplies them by some factors called "weights", represented by $w_1, w_2, ... w_n$, takes the sum of these multiplications and depending on the value of this sum outputs another value &o&:

$$o = f(x_1w_1 + x_2w_2 + ... + x_iw_i + ... + x_nw_n)$$

There are  a few types of perceptrons, differing in the way the sum results in the output, thus the function $f()$ in the above formula.

In this article we will build on the Rosenblatt Perceptron. It was one of the first perceptrons, if not the first. During this article I will simply be using the name "Perceptron" when referring to the Rosenblatt Perceptron

We will investigate the math envolved and discuss its limitations, thereby setting the ground for the future articles. 

## The basic math formula for the Rosenblatt Perceptron

$$
f(x)  =  
  \begin{cases}
 1 & \text{if } x_1w_1 + x_2w_2 + ... + x_iw_i + ... + x_nw_n > b\\
 0 & \text{otherwise} 
  \end{cases}
$$

So, what the perceptron basically does is take some *linear combination* of *input values*, compare it to a *threshold* value $b$, and *return 1 if the threshold is exceeded and zero if not*.

In other words, we classify our observations into two classes: a set of observations which result in in output of $1$, and a set of observations resulting in an output of $0$.

If you search the internet on information about the perceptron you will find alternative definitions which define the formula as follows:

$$
f(x)  =  
  \begin{cases}
 +1 & \text{if } x_1w_1 + x_2w_2 + ... + x_iw_i + ... + x_nw_n > b\\
 -1 & \text{otherwise} 
  \end{cases}
$$

We will see further this does not affect the workings of the perceptron

Lets digg a little deeper:
  
## Take a linear combination of input values


Remember the introduction. In it we said the perceptron takes some input value $[x_1, x_2, ..., x_i, ..., x_n]$, some weights $[w_1, w_2, ..., w_i, ..., w_n]$, multiplies them with each other and takes the sum of these multiplications:

$$x_1w_1 + x_2w_2 + ... + x_iw_i + ... + x_nw_n$$

This is the definition of a *Linear Combination*: it is the sum of some terms multiplied by constant values. In our case the terms are the features and the constants are the weights.

If we substitute the subscript by a variable $i$, then we can write the sum as

$$\sum_{i=1}^{n} x_iw_i$$

This is called the [Capital-sigma notation](https://en.wikipedia.org/wiki/Summation#Capital-sigma_notation), the $\sum$ represents the summation, the subscript $_{i=1}$ and the superscript $^{n}$ represent the range over which we take the sum and finally $x_iw_i$ represents the "things" we take the sum of.

Also, we can see all $x_i$ and all $w_i$ as *vectors*:
$$
\begin{aligned}
X&=[x_1, x_2, ..., x_i, ..., x_n]\\
W&=[w_1, w_2, ..., w_i, ..., w_n]
\end{aligned}
$$

In this, $n$ represents the dimension of the vector: it is the number of scalar elements in the vector.
In this case, the summation is the so-called *dot-product* of the vectors:

$$X \cdot W$$

## Oooh, hold your horses! You say what? A 'Vector' ?

 

https://en.wikipedia.org/wiki/Vector_(mathematics_and_physics)
https://personalpages.manchester.ac.uk/staff/Andrew.Hazel/MATH45061/MATH45061_Ch1.pdf
https://physics.stackexchange.com/questions/131348/is-force-a-contravariant-vector-or-a-covariant-vector-or-either
https://www.mathpages.com/home/kmath398/kmath398.htm
http://nct.goetheanum.org/cocontra.htm
https://www.google.be/search?q=contravariance+vs+magnitude+and+direction&safe=active&rlz=1C1GCEA_enBE778BE778&ei=AXjqW53HN4-kwQLbj73YBQ&start=10&sa=N&ved=0ahUKEwjdy6yt59DeAhUPUlAKHdtHD1sQ8tMDCKQB&biw=1375&bih=878
https://en.wikipedia.org/wiki/Coordinate_vector


Ok, I may have gone a little too fast there by introducing vectors and not explaining them.

### Definition of a Vector

To make things more visual (which can help but isn't always a good thing), I will start with a graphical representation of a 2-dimensional vector:

![A vector in 2-dim space](url_naar_afbeelding)

The above point in the coordinate space $\mathbb{R}^2$ can be represented by a vector going from the origin to that point:
$$\mathbf{a} = (a_1, a_2), \text{ in }\mathbb{R}^2$$

We can further extend this to 3-dimensional coordinate space and generalize it to n-dimensional space:
$$\mathbf{a} = (a_1, a_2, ..., a_n), \text{ in }\mathbb{R}^n$$

In text (from Wikipedia):
> A (Euclidean) Vector is a geometric object that has a magnitude and a direction

#### The Magnitude of a Vector 
The magnitude of a vector, also called its norm, is defined by the root of the sum of the squares of it's components and is written as $\lvert\lvert{a}\lvert\lvert$
In 2-dimensions, the definition comes from Pythagoras' Theorem:
$$\lvert\lvert{\mathbf{a}}\lvert\lvert = \sqrt{(a_1)^2 + (x_2)^2}$$
Extended to n-dimensional space, we talk about the Euclidean norm:
$$\lvert\lvert{\mathbf{a}}\lvert\lvert = \sqrt{a_1^2 + a_2^2 + ... + a_i^2 + ... + a_n^2} = \sqrt{\sum_{i=1}^{n} a_i^2}$$

Try it yourself:
==interactieve versie van deze regel==

#### The Direction of a Vector
The direction of a 2-dimensional vector is defined by its angle to the positive horizontal axis:
$$\theta =\tan^{-1}(\frac{a_2}{a_1})$$
This works well in 2 dimensions but it doesn't scale to multiple dimensions: for example in 3 dimensions, in what plane do we measure the angle? Which is why the direction cosines where invented: this is a new vector taking the cosine of the original vector to each axis of the space.
$$(\cos(\alpha_1), \cos(\alpha_2), ..., \cos(\alpha_i), ..., \cos(\alpha_n))$$

We know from geometry that the cosine of an angle is defined by:
$$\cos(\alpha) = \frac{\text{adjacent}}{\text{hypothenuse}}$$

Try it yourself:
==interactieve versie van deze regel==

So, the definition of the direction cosine becomes
$$(\frac{a_1}{\lvert\lvert{\mathbf{a}}\lvert\lvert}, \frac{a_2}{\lvert\lvert{\mathbf{a}}\lvert\lvert}, ..., \frac{a_i}{\lvert\lvert{\mathbf{a}}\lvert\lvert}, ..., \frac{a_n}{\lvert\lvert{\mathbf{a}}\lvert\lvert})$$

This direction cosine is a vector $v$ with length 1 in the same direction as the original vector. This can be simply determined from the definition of the magnitude of a vector:

$$
\begin{aligned}
\lvert\lvert{\mathbf{v}}\lvert\lvert&=\sqrt{(\frac{a_1}{\lvert\lvert{\mathbf{a}}\lvert\lvert})^2 +  (\frac{a_2}{\lvert\lvert{\mathbf{a}}\lvert\lvert})^2 + ... + (\frac{a_i}{\lvert\lvert{\mathbf{a}}\lvert\lvert})^2 + ... + (\frac{a_n}{\lvert\lvert{\mathbf{\mathbf{a}}}\lvert\lvert})^2}\\
&=\sqrt{\frac{(a_1)^2+(a_2)^2+...+(a_i)^2+...+(a_n)^2}{\lvert\lvert{\mathbf{a}}\lvert\lvert^2}}\\
&=\frac{\sqrt{(a_1)^2+(a_2)^2+...+(a_i)^2+...+(a_n)^2}}{\lvert\lvert{\mathbf{a}}\lvert\lvert}\\
&=\frac{\lvert\lvert{\mathbf{a}}\lvert\lvert}{\lvert\lvert{\mathbf{a}}\lvert\lvert}\\
&=1\\
\end{aligned}
$$

This vector with length 1 is also called the *unit vector*.

Try it yourself:
==interactieve versie van deze regel==

### Operations with Vectors 
#### Sum and difference of two Vectors
Say we have two vectors:

$$\begin{aligned}
\mathbf{a} &= (a_1, a_2, ..., a_n), \text{ in }\mathbb{R}^n\\
\mathbf{b} &= (b_1, b_2, ..., b_n), \text{ in }\mathbb{R}^n
\end{aligned}$$

The sum of two vectors is the vector resulting from the addition of the components of the orignal vectors. 

$$\begin{aligned}
\mathbf{c} &= \mathbf{a} + \mathbf{b}\\
  &= (a_1 + b_1, a_2 + b_2, ..., a_n + b_n)
\end{aligned}$$

Try it yourself:
==interactieve versie van deze regel==

The difference of two vectors is the vector resulting from the differences of the components of the original vectors:

$$\begin{aligned}
\mathbf{c} &= \mathbf{a} - \mathbf{b}\\
  &= (a_1 - b_1, a_2 - b_2, ..., a_n - b_n)
\end{aligned}$$

Try it yourself:
==interactieve versie van deze regel==


#### Scalar multiplication 
Say we have a vector $\mathbf{a}$ and a scalar $\lambda$ (a number):

$$\begin{aligned}
\mathbf{a} &= (a_1, a_2, ..., a_n), \text{ in }\mathbb{R}^n\\
\lambda 
\end{aligned}$$

A vector multiplied by a scalar is the vector resulting of the multiplication of each component of the original vector by the scalar:
$$\begin{aligned}
\mathbf{c} &= \lambda \mathbf{a}\\
  &= (\lambda a_1, \lambda a_2, ..., \lambda a_n)
\end{aligned}$$

Try it yourself:
==interactieve versie van deze regel==

#### Dot product 

The dot-product is the scalar (a real number) resulting of taking the sum of the products of the corresponding components of two vectors:

$$\begin{aligned}
\mathbf{c} &= \mathbf{a} \cdot \mathbf{b}\\
&= a_1 b_1 + a_2 b_2 + ... + a_n b_n\\
&= \sum_{i=1}^{n} a_ib_i
\end{aligned}$$

Geometrically, this is equal to the multiplication of the magnitude of the vectors with the cosine of the angle between the vectors:
$$\begin{aligned}
\mathbf{c} &= \mathbf{a} \cdot \mathbf{b}\\
&= {\lvert\lvert{\mathbf{a}}\lvert\lvert}\text{ }{\lvert\lvert{\mathbf{b}}\lvert\lvert}\text{ }cos(\alpha)\\
\end{aligned}$$

There are several proofs for this, which I will not repeat here. The article on [SVM's](https://www.svm-tutorial.com/2014/11/svm-understanding-math-part-2/) has one, and [this article on the dot-product](http://tutorial.math.lamar.edu/Classes/CalcII/DotProduct.aspx) also contains a very understadable proof.

From this last definition we can make two important assertions.

First, if, for two vectors with a magnitude not zero, the dot product is zero, then those vectors are perpendicular. Because the magnitude of the vectors is not zero, the dot product can only be zero if the $cos(\alpha)$ is zero. And thus if the angle $\alpha$ between the vectors is either 90 or -90 degrees. And thus only if the two vectors are perpendicular. (Try it out in the interactive example below!)

Second, if one of the two vectors has a magnitude of 1, then the dot product equals [the projection of the second vector on this unit vector](http://www.math.ryerson.ca/~danziger/professor/MTH141/Handouts/projections.pdf). (Try it out in the interactive example below!). This can also easily be seen:

$$\begin{aligned}
\text{if }{\lvert\lvert{a}\lvert\lvert} = 1\text{ then }\\
c &= a \cdot b\\
&= {\lvert\lvert{a}\lvert\lvert}\text{ }{\lvert\lvert{b}\lvert\lvert}\text{ }cos(\alpha)\\
&= {\lvert\lvert{b}\lvert\lvert}\text{ }cos(\alpha)\\
\end{aligned}$$

Try it yourself:
==interactieve versie van deze regel==

The dot product is **commutative**:
$$\mathbf{a} \cdot \mathbf{b} = \mathbf{b} \cdot \mathbf{a}$$

Try it yourself:
==interactieve versie van deze regel==

The dot product is **distributive**:
$$\mathbf{a} \cdot (\mathbf{b}+\mathbf{c}) = \mathbf{a} \cdot \mathbf{b} + \mathbf{a} \cdot \mathbf{c}$$

Try it yourself:
==interactieve versie van deze regel==

The **scalar multiplication** property:
$$(\lambda\mathbf{a}) \cdot \mathbf{b} = \mathbf{a} \cdot (\lambda\mathbf{b}) = \lambda(\mathbf{a} \cdot \mathbf{b})$$

Try it yourself:
==interactieve versie van deze regel==

Okay, now you know what a Vector is. Let us continue our journey.

## Linearely seperable features

So, we where saying: The sum of the products of the components of the feature and weight vector is equal to the Dot-product.

The perceptron formula now becomes:
$$
f(x)  =  
  \begin{cases}
 1 & \text{if } X \cdot W > b\\
 0 & \text{otherwise} 
  \end{cases}
$$

Remember what we did originally: we took a linear combination of the input values $[x_1, x_2, ..., x_i, ..., x_n]$ which resulted in the formula:
$$x_1w_1 + x_2w_2 + ... + x_iw_i + ... + x_nw_n > b$$

You may remember a similar formula from your mathematics class, the equation of a hyperplane:
$$x_1w_1 + x_2w_2 + ... + x_iw_i + ... + x_nw_n = b$$

Or, with dot product notation:
$$X \cdot W = b$$

So, the equation $X \cdot W > b$ defines all the points on one side of the hyperplane, and $X \cdot W <= b$ all the points on the other side of the hyperplane and on the hyperplane itself. This happens to be the very definition of ["linear seperability"](https://en.wikipedia.org/wiki/Linear_separability) 

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

If we consider the components $a$ and $b$ as a vector $M$, and $x$ en $y$ as a vector $P$, then the above is the dot product:
$$\begin{aligned}
M &= (a, b), \text{ in }\mathbb{R}^2\\
P &= (x, y), \text{ in }\mathbb{R}^2\\
\end{aligned}$$
Then:
$$\begin{aligned}
ax + by &= 0\\
M \cdot P &= 0\\
\end{aligned}$$

So, how come our dot product in two dimensions appears to be a line through the origin? 

Remember that when we discussed the dot product, we came to the conclusion that if the dot product is zero for two vectors with magnitude not zero, then those vectors need to be perpendicular. So, if we fix the coordinates of the vector $M$, thus fix the values $a$ and $b$, then the above equation resolves to all vectors perpendicular to the vector $M$, which equals to all points on the line perpendicular to the vector $M$ and going through the origin.

So, vector M determines the direction of the line: the vector is perpendicular to the direction of the line.

Try it yourself:
==interactieve versie van deze regel==

#### A line at some distance from the origin

Above, we simplified our equation resulting in the equation of a line through the origin. Let us consider the full equation again:

$$ax + by + c = 0$$

Rearranging a bit:

$$ax + by = -c$$

And replacing $-c$ with $d$:

$$ax + by = d$$

Here also, we can consider replacing this with the dot product of vectors:

$$\begin{aligned}
M &= (a, b), \text{ in }\mathbb{R}^2\\
P &= (x, y), \text{ in }\mathbb{R}^2\\
\end{aligned}$$

Then:

$$\begin{aligned}
ax + by &= d\\
M \cdot P &= d\\
&= {\lvert\lvert{M}\lvert\lvert}\text{ }{\lvert\lvert{P}\lvert\lvert}\text{ }cos(\alpha)
\end{aligned}$$

We can "normalize" this equation by dividing it through the length of $M$, resulting in the dot product of the unit vector in the direction of $M$, $u$ and the vector $P$:

$$\begin{aligned}
\frac{M \cdot P}{\lvert\lvert{M}\lvert\lvert} &= \frac{d}{\lvert\lvert{M}\lvert\lvert}\\
u \cdot P &= \frac{d}{\lvert\lvert{M}\lvert\lvert}\\
&= {\lvert\lvert{u}\lvert\lvert}\text{ }{\lvert\lvert{P}\lvert\lvert}\text{ }cos(\alpha)\\
&= {\lvert\lvert{P}\lvert\lvert}\text{ }cos(\alpha)
\end{aligned}$$

And as seen above when discussing the dot product, this equals the magnitude of the projection of vector $P$ onto the unit vector in the direction of $M$. So, the above equation gives all vectors whose projection on the unit vector in the direction of $M$ equals $d/{\lvert\lvert{M}\lvert\lvert}$
This equals all vectors to points on the line perpendicular to $M$ and at a distance $d/{\lvert\lvert{M}\lvert\lvert}$ from the origin.

Try it yourself:
==interactieve versie van deze regel==

### Extending to 3-dimensional space: equation of a plane

$$ax + by + cz= 0$$

Again, through vectors:
If we consider the components $a$, $b$ and $c$ as a vector $M$, and $x$, $y$ and $z$ as a vector $P$, then the above is the dot product:
$$\begin{aligned}
M &= (a, b, c), \text{ in }\mathbb{R}^3\\
P &= (x, y, z), \text{ in }\mathbb{R}^3\\
\end{aligned}$$
Then:
$$\begin{aligned}
ax + by + cz &= 0\\
M \cdot P &= 0\\
\end{aligned}$$

Again, if the dot product is zero for two vectors with magnitude not zero, then those vectors need to be perpendicular. So, if we fix the coordinates of the unit vector $M$, thus fix the values $a$ and $b$, then the above equation resolves to all vectors perpendicular to the vector $M$, which equals to all points in the plane perpendicular to the vector $M$ and going through the origin.

A similar line of thought can be followed for the equation:

$$ax + by + cz= d$$

Here also, we can consider replacing this with the dot product of vectors:

$$\begin{aligned}
M &= (a, b, c), \text{ in }\mathbb{R}^3\\
P &= (x, y, z), \text{ in }\mathbb{R}^3\\
\end{aligned}$$

$$\begin{aligned}
ax + by + cz &= d\\
M \cdot P &= d\\
&= {\lvert\lvert{M}\lvert\lvert}\text{ }{\lvert\lvert{P}\lvert\lvert}\text{ }cos(\alpha)
\end{aligned}$$

Normalizing by dividing through the length of $M$, with $u$ being the unit vector in the direction of $M$:

$$\begin{aligned}
\frac{M \cdot P}{\lvert\lvert{M}\lvert\lvert} &= \frac{d}{\lvert\lvert{M}\lvert\lvert}\\
u \cdot P &= \frac{d}{\lvert\lvert{M}\lvert\lvert}\\
&= {\lvert\lvert{u}\lvert\lvert}\text{ }{\lvert\lvert{P}\lvert\lvert}\text{ }cos(\alpha)\\
&= {\lvert\lvert{P}\lvert\lvert}\text{ }cos(\alpha)
\end{aligned}$$

And as seen above when discussing the dot product, this equals the magnitude of the projection of vector $P$ onto the unit vector in the direction of $M$. So, the above equation gives all vectors whose projection on the unit vector in the direction of $M$ equals $d/\lvert\lvert{M}\lvert\lvert$
This equals all vectors in the plane perpendicular to $M$ and at a distance $d/\lvert\lvert{M}\lvert\lvert$ from the origin.

### Extending to n-dimensional space: equation of a hyper-plane

In 3-dimensional space, we defined the equation of a plane as:
$$ax + by + cz= d$$

If we use the symbols we are customed to in our discussion of the percpetron rule, we can write:
$$w_1x_1 + w_2x_2 + w_3x_3= b$$

*NOTE: Mind you however that the scalar $b$ in this last equation is not the same as the scalar $b$ in the first equation*

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
 1 & \text{if } X \cdot W > b\\
 0 & \text{otherwise} 
  \end{cases}
$$

So, we output 1 if the dot product of the feature vector $X$ and weight vector $W$ is larger then $b$, and zero $\text{otherwise}$. But what is $\text{otherwise}$ ?
Well $\text{otherwise}$ is:
$$X \cdot W <= b$$

Ah, equal to or less then $b$. We know the *equal to* part, that is our above hyper-plane.
$$X \cdot W = b$$

So what remains is the *less than* part
$$X \cdot W < b$$

It just so happens the inequality equations define two so called half-spaces: one half space above the hyper-plane and one half-space below the hyper-plane.

### Linear separability and half-spaces

Let us again take the equation of a hyperplane:
$$\begin{aligned}
w_1x_1 + w_2x_2 + w_ix_i + ... + w_nx_n &= b\\
\sum_{i=1}^{n} w_ix_i &= b\\
X \cdot W &= b
\end{aligned}$$

This hyperplane seperates the space $\mathbb{R}^n$ in two convex sets of points, hence the name half-space.

One half-space is represented by the equation
$$X \cdot W > b$$

The other by
$$X \cdot W < b$$

Let us analize the first equation. First, convert it to a vector representation:

$$\begin{aligned}
X \cdot W &> b\\
{\lvert\lvert{X}\lvert\lvert}\text{ }{\lvert\lvert{W}\lvert\lvert}\text{ }cos(\alpha) &> b
\end{aligned}$$

Normalizing:
$${\lvert\lvert{X}\lvert\lvert}\text{ }cos(\alpha) > \frac{b}{\lvert\lvert{W}\lvert\lvert}$$

So, the geometric interpretation is the set of all points with a projection on the unit vector in the direction of the weight vector $W$ *larger* then some constant value $\frac{b}{\lvert\lvert{W}\lvert\lvert}$.

A similar reasoning can be made for the equation $X \cdot W < b$ : it results in the set of points with a projection on the unit vector in the direction of the weight vector $W$ *smaller* then some constant value $\frac{b}{\lvert\lvert{W}\lvert\lvert}$.

We can imagine these two sets as being the set of all points on either one side or the other side of the hyper-plane.

These half spaces are also convex. 

The definition of convex goes as follows (from Wikipedia):
> in a Euclidean space, a convex region is a region where, for every pair of points within the region, every point on the straight line segment that joins the pair of points is also within the region.

Mathematically this can be more rigourously be described as:
> A set $C$ in $S$ is said to be convex if, for all $a$ and $b$ in $C$ and all $\lambda$ in the interval $(0, 1)$, the point $(1 −  {\lambda})a  +  {\lambda}b$ also belongs to $C$.

The equation $(1 −  {\lambda})a  +  {\lambda}b$ is actually the equation of a line segment between points $a$ and $b$. We can see this from following:

Let us define two vectors in the multi-dimensional space:
$$\begin{aligned}
A &= (a_1, a_2, ..., a_i, ..., a_n), \text{ in }\mathbb{R}^n\\
B &= (b_1, b_2, ..., b_i, ..., b_n), \text{ in }\mathbb{R}^n\\
\end{aligned}$$
Then a line segment going from A to B can be defined as:
$$r = \vec{oa} + \lambda \vec{ab}$$
with $\vec{oa}$ being the vector going from the origin $o$ to $a$ and $\vec{ab}$ the vector going from $a$ to $b$. 
==hier nog een prentje die dat illustreert==

Try it yourself:
==interactieve versie van deze regel==

We know from the section on vector math above that the vector going from  $a$ to $b$ is equal to $b-a$ and thus we can write:
$$\begin{aligned}
r &= \vec{oa} + \lambda \vec{ab}\\
&= A + {\lambda}(B-A) \\
&= A + {\lambda}B-{\lambda}A \\
&= (1-{\lambda})A + {\lambda}B \\
\end{aligned}$$

Now we can proof the half spaces separated by the hyper-plane are convex:

Let us consider the upper half plane. For any two vectors $X$, $Y$ in that half space we have:
$$\begin{aligned}
X \cdot W > b\\
Y \cdot W > b
\end{aligned}$$

If the half space is convex, then each point resulting from the equation
$$(1-{\lambda})X + {\lambda}Y$$
must belong to the half space, which is equal to saying that every point on the line segment between $X$ and $Y$ must belong to the half space. Substituation in the equation of the half space gives:
$$((1-{\lambda})X + {\lambda}Y) \cdot W > b$$
Then, by the distributive and scalar multiplication properties of the dot product we can re-arrange to:
$$\begin{aligned}
(1-{\lambda})X \cdot W + {\lambda}Y \cdot W &> b\\
(1-{\lambda})X \cdot W + {\lambda}Y \cdot W - b &> 0\\
(1-{\lambda})X \cdot W + {\lambda}Y \cdot W &> b\\
\end{aligned}$$
Since we now that $0 < {\lambda} < 1$ and $X \cdot W > b$ and also $Y \cdot W > b$ then the above inequality must also hold true. And thus we have proven that the half space is indeed convex.

Try it yourself:
==interactieve versie van deze regel==

https://ljk.imag.fr/membres/Anatoli.Iouditski/cours/convex/chapitre_1.pdf
https://en.wikipedia.org/wiki/Line_segment
https://en.wikipedia.org/wiki/Line_(geometry)
https://math.stackexchange.com/questions/344416/line-segment-connecting-points-in-a-convex-set
https://www.quora.com/How-do-I-prove-that-half-a-plane-is-convex
http://answers.google.com/answers/threadview/id/262560.html
http://www.math.pitt.edu/~sparling/23012/*vectors5/node6.html



## As i was saying: Linearily seperable ...

Thus, getting back at our formula for the preceptron:

$$
f(x)  =  
  \begin{cases}
 1 & \text{if } X \cdot W > b\\
 0 & \text{otherwise} 
  \end{cases}
$$

We can now see how this formula divides our feature-space in two *convex* half spaces. Mind the word *convex* here: it does not just divide the feature space in two subspaces, but in two convex subspaces.

This means that we cannot seperate feature points into classes that are not convex. Visually in two-dimensional space, we cannot seperate featues like this:
==hier prentje van een niet lineair verdeelbare punten==

If you've been reading about the perceptron allready, you may have read about the fact that it cannot solve the XOR problem: it cannot seperate the inputs according to the XOR function. That is exactly because of the above: the outcome is not convex, hence is not linearily seperable.
==hier prentje van de xor functie==

If you search the internet for the formula of the Rosenblatt perceptron, you will also find some in which the factor $b$ is no longer present. What happened to it? Some re-arrangement of the components of the addition make it end up in the dot product:

$$\begin{aligned}
W \cdot X &> b\\
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
X'&=[x_0, x_1, x_2, ..., x_i, ..., x_n]\\
W'&=[w_0, w_1, w_2, ..., w_i, ..., w_n]
\end{aligned}
$$

We can now write:
$$
f(x)  =  
  \begin{cases}
 1 & \text{if } X' \cdot W' > 0\\
 0 & \text{otherwise} 
  \end{cases}
$$

So we have a function which classifies our features into two classes by multiplying them with a weight and if the result is positive assigns them a label "1" and "0" otherwise. 

Further in the article I will leave the accent of the vectors and just write $W$ and $X$ which have the $w_0$ and $x_0$ included.

Try it yourself:
==interactieve versie van deze regel==

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

I will not elaborate much more on this function not being continuous because it is not important for the discussion at hand. In a next article, when we discuss the ADALINE perceptron I will get back to this.

## Learning the weights

We've covered a lot about how the perceptron classifies the features in two linearily seperable classes using the weight vector. But the big question is: if we have some samples of features for which we know the resulting class, how can we find the weights so that we can also classify unknown values of the feature vector? Or, how can we find the hyperplane sepeating the features?

This is where the perceptron learning rule comes in.

### The perceptron learning rule

http://hagan.okstate.edu/4_Perceptron.pdf
https://en.wikipedia.org/wiki/Perceptron

First, we define the error $e$ as being the difference between the desired output $d$ and the effective output $o$ for an input vector $X$ and a weight vector $W$:
$$e = d-o$$
Then we can write the learning rule as:
$$W_{i+1} = W_{i} + eX$$

In this $W_{i+1}$ is the new weight vector, $W_{i}$ is the current weight vector and $e$ is the current error. We initialize the weight vector with some random values, thus $W_0$ has some random values. You will find similar definitions of the learning rule which also use a learning rate factor. As we will show later when we proof the convergence of the learning rule this factor is not really necessary. That is why we leave it out here.

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
1. We only change the weight vector $W$ if the prediction made by the perceptron is wrong, because if it is correct the error amounts to zero.
2. If we incorrectly predict a feature to be above the hyperplane then the error is -1 and we subtract the feature vector from the weight vector.
3. If we incorrectly predict a feature to be below the hyperplane then the error is 1 and we add the feature vector to the weight vector.

Let's see what this gives geometrically. The following discussion gives an intuitive feel of what the learning algorithm does, but is by no means a mathematically rigourous discussion. So, we start with ignoring the threshold factor of the vectors: that is, we ignore $w_0$ and $x_0$.


So, we are left with the factors determining the direction of the seperating hyperplane. Let us now plot some examples and see what happens.

#### Case 1: Desired result is 0 but 1 was predicted

The error $e$ is -1, so we need to subtract the new feature vector from the current weight vector to get the new weight vector:
$$W_{i+1} = W_{i} - X$$

Remember that the weight vector is actually perpendicular to the hyperplane. The result of subtracting the incorrectly classified vector from the weight vector is a rotation of the separating hyperplane in the direction of the incorrectly classified point. In other words, we rotate the separating hyperplane in such a way that our newly learned point is closer to the half-space it should reside in.

Try it yourself:
==interactieve versie van deze regel==

#### Case 2: Desired result is 1 but 0 was predicted

The error $e$ is 1, so we need to add the new feature vector to the current weight vector to get the new weight vector:
$$W_{i+1} = W_{i} + X$$

The result of adding the vector to the weight vector is a rotation of the separating hyperplane in the direction of the incorrectly classified point. In other words, we rotate the separating hyperplane in such a way that our newly learned point is closer to the half-space it should reside in.

Try it yourself:
==interactieve versie van deze regel==


==
wat is de invloed van het niet in rekening brengen van $w_0$ en $x_0$ ?
https://datascience.stackexchange.com/questions/16843/perceptron-learning-rate==

==VANAF HIER nog eens goed onderzoeken voor die otherwise: er zijn artikelen die spreken over 0, en er zijn er die spreken over -1. Hier aantonen dat dit geen probleem is voor de learning rule.==
dit maakt mogelijks ook geen verschil tijdens  de learning phase 
*in het geval van 0*:
je wenst 1 en hebt 1: 1-1 = 0, dus geen aanpassing
je wenst 0 en hebt 0: 0-0 = 0, dus geen aanpassing
je wenst 1 en hebt 0: 0-1 = -1, aanpassen met -r*X
je wenst 0 en hebt 1: 1-0 = 1, aanpassen met r*X

*in het geval van -1*:
je wenst 1 en hebt 1: 1-1 = 0, dus geen aanpassing
je wenst -1 en hebt -1: (-1)-(-1) = 0, dus geen aanpassing
je wenst 1 en hebt -1: (-1)-1 = -2, aanpassen met -2r*X
je wenst (-1) en hebt 1: 1-(-1) = 2, aanpassen met 2r*X

is dus gewoon een verschaling van de learning rate !!!!
==TOT HIER==


## Convergence of the learning rule.
https://stackoverflow.com/questions/41989830/geometric-proof-of-convergence-of-perceptron-algorithm
https://jaidevd.github.io/posts/a-geometric-proof-of-the-perceptron-convergence-theorem/

The above gives an intuïtive feel of what makes the learning rule work, but is not a mathematical prove. In following we will develop a mathematical prove showing the perceptron rule will converge to a solution in a finite number of steps if the samples given are linearily seperable.

Read that sentence again please. First, we talk about a finite number of steps but we don't now what that number is up front ==is dit correct?==. Second, this is only thru if the samples given are lineariliy seperable. Thus, if they are *not* linearily seperable we can keep on learning and have no idea when to stop !!!

This is the proof:

### Proof of the convergence
==hier komt het bewijs van de convergentie van de learning rule==

http://www.cs.ubbcluj.ro/~csatol/kozgaz_mestint/4_neuronhalo/PerceptConvProof.pdf
http://130.243.105.49/~lilien/ml/seminars/2007_02_01b-Janecek-Perceptron.pdf
https://www.pearsonhighered.com/assets/samplechapter/0/1/3/1/0131471392.pdf
https://www.youtube.com/watch?v=tRG-OnnQ9g4

alternative proof:
http://web.mit.edu/course/other/i2course/www/vision_and_learning/perceptron_notes.pdf
https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-867-machine-learning-fall-2006/lecture-notes/lec2.pdf



## Wrap up

### Basic formula of the Rosenblatt Perceptron

The basic formula classifies the features by weighting them into two seperate classes.
We have seen that the way this is done, is by comparing the dot product of the feature vector $X$ and the weight vector $W$ with some fixed value $b$. If the dot product is larger then this fixed value, then we classisify them info one class by assigning them a label 1, otherwise we put them into the other class by assigning them a label 0.

$$
f(x)  =  
  \begin{cases}
 1 & \text{if } (X \cdot W - b) > 0\\
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
==afbeelding van een neuraal netwerk==
In this article we also have a *single layer*.

*Feed Forward*
This stacking of layers on top of each other and the output of previous layers serving as the input for next layers results in *feed forward* networks. There is no feedback of upper layers to lower layers. There are no loops. For our single perceptron we also have no loops and thus we have a *feed forward* network.

**Integration function**
The calculation we make with the weight vector $W$ and the feature vector $X$ is called *the integration function*. In the Rosenblatt perceptron the integration function is the dot-product.

**Bias**
The offset $b$ with which we compare the result of the integration function is called *the bias*.
  
**Activation function (transfer function)**
The output we receive from the perceptron based on the calculation of the integration function is determined by the *activation function*. The activation function for the Rosenblatt percpetron is the Heaviside step function.
    
**Supervised learning**
Supervised learning is a type of learning in which we feed samples into our algorithm and tell it the result we expect. By doing this the neural network learns how to classify the examples. After giving it enough samples we expect to be able to give it new data which it will automatically classify correctly.

The opposite of this is *Unsupervised learning* in which we give some samples but without the expected result. The algorithm is then able to classify these examples correctly based on some common properties of the samples.

There are other types of learning like *reïnforcement learning* which we will not cover here.

**Online learning**
The learning algorithm of the Rosenblatt preceptron is an example of an *online learning* algorithm: with each new sample given the weight vector is updated;

The opposite of this is *batch learning* in which we only update the weight vector after having fed all samples to the learning algorithm. This may be a bit abstract here but we'll clarify this in later articles.

## What is wrong with the Rosenblatt perceptron?

The main problem of the Rosenblatt preceptron is its learning algorithm. Allthough it works, it only works for linear seperable data. If the data we want to classify is not linearily seperable, then we do not really have any idea on when to stop the learning and neither do we know if the found hyperplane somehow minimizes the wrongly classified data.

Let's say we have some data which is not linearily seperable:
==afbeelding van niet linear scheidbare data==

We would like to find the hyperplane which minimizes the number of wrongly classified samples. That is, we would like to find a line similar to the following:

==afbeelding van de oplossing die we graag zouden vinden==

There are of course mathematical tools which allow us to find this hyperplane. They basically all define some kind of error function and then try to minimize this error. The error function is typically defined as a function of the desired output and the effective output just like we did above. The minimization is done by calculating the derivative of this error function. And herein is the problem for the Rosenblatt preceptron. Because the output is defined by the Heaviside Step function and this function does not have a derivative, because it is not continuous, we cannot have a matematically rigourous learning method.

If the above is gong a little to fast, don't panic. In the next article about the ADALINE perceptron we'll dig deeper into error functions and derivation.

## References 

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

https://en.wikipedia.org/wiki/Convex_set

### Perceptron

Wikipedia on the perceptron: [Perceptron](https://en.m.wikipedia.org/wiki/Perceptron)
Another explanation of the perceptron: [The Simple Perceptron](http://aass.oru.se/~lilien/ml/seminars/2007_02_01b-Janecek-Perceptron.pdf)
A Peceptron is a special kind of [linear classifier](https://en.wikipedia.org/wiki/Linear_classifier)
Following article as an interesting view on what they call the duality of input and weight-space: [3. Weighted Networks – The Perceptron](http://page.mi.fu-berlin.de/rojas/neural/chapter/K3.pdf)

### Perceptron Learning

Following article gives another intuitive explanation on why the learning algorithm works: [Perceptron Learning Algorithm: A Graphical Explanation Of Why It Works](https://towardsdatascience.com/perceptron-learning-algorithm-d5db0deab975)



== dit nog ergens te behandelen ==


linear binary classifier. They both compute a linear (actually affine) function of the input using a set of adaptive weight ww and a bias > wat is een “affine function”

[http://mathworld.wolfram.com/AffineFunction.html](http://mathworld.wolfram.com/AffineFunction.html)

[https://math.stackexchange.com/questions/275310/what-is-the-difference-between-linear-and-affine-function](https://math.stackexchange.com/questions/275310/what-is-the-difference-between-linear-and-affine-function)


== alles hieronder is afgekeurd voor dit artikel == 


[https://appliedgo.net/perceptron/](https://appliedgo.net/perceptron/)
[https://natureofcode.com/book/chapter-10-neural-networks/](https://natureofcode.com/book/chapter-10-neural-networks/) part about perceptron
[https://machinelearningmastery.com/implement-perceptron-algorithm-scratch-python/](https://machinelearningmastery.com/implement-perceptron-algorithm-scratch-python/)

[https://www.quora.com/Artificial-Neural-Networks-what-is-the-difference-between-perceptron-and-adaline-in-recognition-+-and-X-images](https://www.quora.com/Artificial-Neural-Networks-what-is-the-difference-between-perceptron-and-adaline-in-recognition-+-and-X-images)

**Loss function**
https://www.quora.com/What-is-the-loss-function-of-the-standard-perceptron-algorithm
"Hinge loss"
https://proofwiki.org/wiki/Continuity_of_Heaviside_Step_Function
https://math.stackexchange.com/questions/497798/proving-discontinuity-by-epsilon-delta
https://www.intmath.com/functions-and-graphs/7-continuous-discontinuous-functions.php
https://math.stackexchange.com/questions/828508/why-can-a-discontinuous-function-not-be-differentiable

 ==alles hier onder is geen definitieve tekst==









Cost Function

some measure of inaccuracy relative to the target output of the network

[https://www.cc.gatech.edu/~bboots3/CS4641-Fall2016/Lectures/Lecture5.pdf](https://www.cc.gatech.edu/~bboots3/CS4641-Fall2016/Lectures/Lecture5.pdf)

[http://ai.cs.umbc.edu/~oates/classes/2011/ML/slides/perceptron.pdf](http://ai.cs.umbc.edu/~oates/classes/2011/ML/slides/perceptron.pdf)

Plotting the decision boundary

[https://stats.stackexchange.com/questions/71335/decision-boundary-plot-for-a-perceptron](https://stats.stackexchange.com/questions/71335/decision-boundary-plot-for-a-perceptron)

[https://stackoverflow.com/questions/31292393/how-do-you-draw-a-line-using-the-weight-vector-in-a-linear-perceptron](https://stackoverflow.com/questions/31292393/how-do-you-draw-a-line-using-the-weight-vector-in-a-linear-perceptron)

  
  
  

Learning

[http://page.mi.fu-berlin.de/rojas/neural/chapter/K4.pdf](http://page.mi.fu-berlin.de/rojas/neural/chapter/K4.pdf)

[https://www.researchgate.net/profile/Steve_Gallant/publication/5569039_Perceptron-based_learning_algorithms/links/0f3175344302564821000000/Perceptron-based-learning-algorithms.pdf?origin=publication_detail](https://www.researchgate.net/profile/Steve_Gallant/publication/5569039_Perceptron-based_learning_algorithms/links/0f3175344302564821000000/Perceptron-based-learning-algorithms.pdf?origin=publication_detail)

[https://commons.m.wikimedia.org/wiki/File:Perceptron_training_without_bias.gif](https://commons.m.wikimedia.org/wiki/File:Perceptron_training_without_bias.gif)

[https://stats.stackexchange.com/questions/137834/clarification-about-perceptron-rule-vs-gradient-descent-vs-stochastic-gradient](https://stats.stackexchange.com/questions/137834/clarification-about-perceptron-rule-vs-gradient-descent-vs-stochastic-gradient)

[https://stackoverflow.com/questions/4895485/delta-rule-vs-gradient-descent](https://stackoverflow.com/questions/4895485/delta-rule-vs-gradient-descent)

[http://www.cs.ubbcluj.ro/~csatol/kozgaz_mestint/4_neuronhalo/PerceptConvProof.pdf](http://www.cs.ubbcluj.ro/~csatol/kozgaz_mestint/4_neuronhalo/PerceptConvProof.pdf)

[https://www.cse.iitb.ac.in/~shivaram/teaching/old/cs344+386-s2017/resources/classnote-1.pdf](https://www.cse.iitb.ac.in/~shivaram/teaching/old/cs344+386-s2017/resources/classnote-1.pdf)

Volgende bevat een omschrijving waarom de delta rule niet gewoon gradient descent is:

[https://medium.com/@neuralnets/delta-learning-rule-gradient-descent-neural-networks-f880c168a804](https://medium.com/@neuralnets/delta-learning-rule-gradient-descent-neural-networks-f880c168a804)

Kort samengevat: voor de gradient descent moet je een afgeleide kunnen nemen, en dat is bij de delta rule niet mogelijk om dat je daar de “heavyside step function” gebruikt

[https://lcn.epfl.ch/tutorial/english/apb/html/theory.html#Perceptron](https://lcn.epfl.ch/tutorial/english/apb/html/theory.html#Perceptron)

Corrsponds to gradient descend on error surface

  

Conversion theorem

[https://www.youtube.com/watch?v=tRG-OnnQ9g4](https://www.youtube.com/watch?v=tRG-OnnQ9g4) (ergens rond 23 minuten)

Cauchy-schwartz inequality

  

Activation function

[https://en.m.wikipedia.org/wiki/Heaviside_step_function](https://en.m.wikipedia.org/wiki/Heaviside_step_function)

What is limitation of heavyside step function

[https://www.reddit.com/r/MachineLearning/comments/7oms3j/d_despite_the_problematic_derivative_of_the/](https://www.reddit.com/r/MachineLearning/comments/7oms3j/d_despite_the_problematic_derivative_of_the/)

[https://stats.stackexchange.com/questions/263768/can-a-perceptron-with-sigmoid-activation-function-perform-nonlinear-classificati/263816](https://stats.stackexchange.com/questions/263768/can-a-perceptron-with-sigmoid-activation-function-perform-nonlinear-classificati/263816)

Volgende bevat een omschrijving waarom de activatie gaat van -1 tot 1en niet van 0 tot 1: (omdat je met 0 geen correctie kan uitvoeren)

[https://emunix.emich.edu/~sverdlik/DM/Perceptron_Learning.html](https://emunix.emich.edu/~sverdlik/DM/Perceptron_Learning.html)

  



Geometric Representation

[https://stackoverflow.com/questions/22121469/geometric-representation-of-perceptrons-artificial-neural-networks](https://stackoverflow.com/questions/22121469/geometric-representation-of-perceptrons-artificial-neural-networks)

[http://slideplayer.com/slide/5032291/](http://slideplayer.com/slide/5032291/)

[https://math.stackexchange.com/questions/2141076/how-to-detect-on-which-side-of-hyper-plane-the-point-in-rn-is-located](https://math.stackexchange.com/questions/2141076/how-to-detect-on-which-side-of-hyper-plane-the-point-in-rn-is-located)

Zie ook de opmerking “Inner norm product”

Het inner product is een veralgemening van dot-product die dan weer wordt gebruikt bij de perceptron

[https://stackoverflow.com/questions/15688232/check-which-side-of-a-plane-points-are-on](https://stackoverflow.com/questions/15688232/check-which-side-of-a-plane-points-are-on)

[https://math.stackexchange.com/questions/2276176/two-sides-of-a-plane](https://math.stackexchange.com/questions/2276176/two-sides-of-a-plane)

[https://math.stackexchange.com/questions/2607163/how-to-determine-if-a-point-lies-on-the-same-side-of-the-plane-that-origin-does](https://math.stackexchange.com/questions/2607163/how-to-determine-if-a-point-lies-on-the-same-side-of-the-plane-that-origin-does)