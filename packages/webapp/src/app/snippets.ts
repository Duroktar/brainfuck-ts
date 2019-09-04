export type Snippets = typeof snippets;

export const snippets = {
    Addition: `# printMode=literal

++       Cell c0 = 2
> +++++  Cell c1 = 5

[        Start your loops with your cell pointer on the loop counter (c1 in our case)
< +      Add 1 to c0
> -      Subtract 1 from c1
]        End your loops with the cell pointer on the loop counter

At this point our program has added 5 to 2 leaving 7 in c0 and 0 in c1
but we cannot output this value to the terminal since it is not ASCII encoded!

To display the ASCII character "7" we must add 48 to the value 7
48 = 6 * 8 so let's use another loop to help us!

++++ ++++  c1 = 8 and this will be our loop counter again
[
< +++ +++  Add 6 to c0
> -        Subtract 1 from c1
]
< .        Print out c0 which has the value 55 which translates to "7"!
`,
    "Hello World": `# printMode=fromCharCode

++++++++
[
    >++++
    [
        >++
        >+++
        >+++
        >+
        <<<<-
    ]

    >+
    >+
    >-
    >>+

    [<]     Find cell #1
    <-      Decrement value in cell #0
]

>>.>---.+++++++..+++.       Hello
>>.                         (space)
<-.<.+++.------.--------.   world
>>+.                        !
`,
    Fibonacci: `# printMode=literal maxDepth=65000

~ Set up some Variables
>           loop    = 0
>           a       = 0
> +         b       = 1
>           temp    = 0
>           mem     = 0
<<<<

~ Enter main Program loop
++++ ++++
++++ ++++  'loop' = 16
[@loop
    ~ Move to 'a'
    >

    ~ print 'a'
    .

    Step 1: 'temp' = 'a'
    [@a
        >>+     increment 'temp'
        <<-     decrement 'a'
    ]

    Step 2: 'a' = 'mem' = 'b'
    >
    [@b
        >>+<<   increment 'mem'
        < +     increment 'a'
        > -     decrement 'b'
    ]

    Step 3: 'b' = 'b' plus 'temp'
    >
    [@temp
        < +      increment 'b'
        > -      decrement 'temp'
    ]

    Step 4: 'b' = 'b' plus 'mem'
    >
    [@mem
        << +      increment 'b'
        >> -      decrement 'mem'
    ]

    ~ Walk back down to 'a'
    <<<

    ~ Move to 'loop' and decrement
    < -
]
`,
    Looping: `# printMode=literal

>           a = 0
<

++++++++    loop 8 times
[
    increment and print 'a' then decrement 'loop'
    > +.
    < -
]

$   Special debugging symbol (Check out the developers console)
`,
}
