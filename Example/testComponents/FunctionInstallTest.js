import React from 'react';
import { Text, View } from "react-native"
import { useSharedValue, useWorklet, useEventWorklet, install } from 'react-native-reanimated';

const FunctionInstall = () => {
    const sv = useSharedValue(33)
    const sa = useSharedValue([1,2,3, { r: 88, f: 'uuu' }, ['a','b',6,7,8, sv]])
    const so = useSharedValue({ o: { a: { d: { u: ['a', 456]}}}, x: 6, d: 12, arr: sa, plainarr: [5,6,7,8], strarr:['a','b','sdfsdf']})

    ;(useWorklet(function(sv, so, sa) {
        'worklet'
        console.log('[worklet] testing assign')
        // todo write test for assign
        return true
    }, [sv, so, sa]))();

    ;(useWorklet(function(sv, so, sa) {
        'worklet'
        console.log('[worklet] testing withWorklet')
        // todo write test for withWorklet
        return true
    }, [sv, so, sa]))();

    ;(useWorklet(function(sv, so, sa) {
        'worklet'
        console.log('[worklet] testing memory')
        // todo write test for memory
        return true
    }, [sv, so, sa]))();

    ;(useWorklet(function(sv, so, sa) {
        'worklet'
        console.log('[worklet] testing console.log')
        console.log(sv)
        console.log(sv.value)
        console.log(so)
        console.log(sa)
        return true
    }, [sv, so, sa]))();

    // test custom functions installation
    install('hello', function(name) {
        console.log('inside hello')
        return `hello ${ name }`
    });

    install('validateAge', function(name, age) {
        console.log('inside validate age')
        label = (age > 50) ? 'old' : 'young';
        return `${ Reanimated.hello(name) }, you are ${ label }`
    })

    ;(useWorklet(function(sv, so, sa) {
        'worklet'
        console.log('[worklet] testing custom functions')
        console.log(Reanimated.hello('john'))
        console.log(Reanimated.validateAge('samantha', 65))
        return true
    }, [sv, so, sa]))();

    // test constants installation
    install('minimum', -5);
    install('maximum', 12);
    install('label', '[const string works] -> ');

    const currentsv = useSharedValue(-100)
    ;(useWorklet(function(v) {
        'worklet'
        if (v.value < Reanimated.minimum) {
            v.set(Reanimated.minimum)
        }
        if (v.value > Reanimated.maximum) {
            console.log(Reanimated.label + 'over')
            return true
        }
        console.log(Reanimated.label + v.value)
        v.set(v.value + 1)
    }, [currentsv]))();

    // test object installation
    /*
    install('box', {
        x: 23,
        y: 54,
        name: 44,
    });

    const currentCoords = useSharedValue({ x: 0, y: 0 })
    ;(useWorklet(function(coords) {
        'worklet'
        if (coords.x.value > Reanimated.box.x && coords.y.value > Reanimated.box.y) {
            return true;
        }
        if (coords.x.value > Reanimated.box.x) {
            coords.x.set(coords.x.value + 1)
        }
        if (coords.y.value > Reanimated.box.y) {
            coords.y.set(coords.x.value + 1)
        }
        console.log(Reanimated.box.name + ': ' + coords.x.value + ', ' + coords.y.value)
    }, [currentCoords]))();
*/
    // test array installation

    const arr = useSharedValue([1, 2, 3, 5, 8, 13, 21])
    const currentIndex = useSharedValue(0)
    ;(useWorklet(function(arr, index) {
        'worklet'
        if (index.value > arr.length - 1) {
            return true;
        }
        console.log('array test ' + arr[index.value].value)
        index.set(index.value + 1)
    }, [arr, currentIndex]))();

    return (
        <View>
            <Text>Testing function install...</Text>
        </View>
    )
}

export default FunctionInstall