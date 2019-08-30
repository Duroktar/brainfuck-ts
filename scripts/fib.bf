# printMode=literal

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
