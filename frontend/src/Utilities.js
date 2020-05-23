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
    lang: data => {
        return data.map(x => ({
                name: x.suburb,
                value: x.value
            })
        )
    },
    word: data => {
        return data.map(x => ({
                name: x.word,
                value: x.value.average,
                pos: x.value.positive,
                neu: x.value.neutral,
                neg: x.value.negative,
                total: x.value.positive + x.value.neutral + x.value.negative
            })
        )
    },
    wordSuburb: data => {
        return Object.keys(data).map(x => (
            {name: x, value: data[x]}
        ))
    },
    common:data=>{
        return data.map(suburb => ({name:suburb.key, value:suburb.value}))
    }
}

export const Colors = {
    blue:'#69d2ff',
    red: '#ff311d',
    orange: '#fd8a33',
    yellow: '#ffd647',
    lightyellow: '#edff47',
    green: '#90fc33'
}