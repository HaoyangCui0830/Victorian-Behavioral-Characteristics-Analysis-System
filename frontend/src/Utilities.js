export const chartFormatter = {
    time: data => {
        return data.map(x => ({
                name: x.hour,
                value: x.value
            })
        )
    },
    sentiment: data => {
        return data.map(x => ({
                name: x.suburb,
                value: x.polarity.average
            })
        )
    },
    follower: data => {
        return data.map(x => ({
                name: x.suburb,
                value: Math.log2(x.value)
            })
        )
    },
    lang:data => {
        return data.map(x => ({
                name: x.suburb,
                value: x.value
            })
        )
    },
}

export const Colors = {
    red:'#ff311d',
    orange:'#fd8a33',
    yellow:'#ffd647',
    lightyellow:'#edff47',
    green:'#90fc33'
}