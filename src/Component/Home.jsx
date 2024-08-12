import React from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { LineChart } from "react-native-gifted-charts"
import { Image } from 'react-native-svg';

const Home = () => {

    const lineData = [{ value: 0 }, { value: 10 }, { value: 8 }, { value: 58 }, { value: 56 }, { value: 78 }, { value: 74 }, { value: 98 }];
    const lineData2 = [{ value: 0 }, { value: 20 }, { value: 18 }, { value: 40 }, { value: 36 }, { value: 60 }, { value: 54 }, { value: 85 }];

    return (
        <>
            <ScrollView>
                <View style={style.main}>

                    <View style={style.headerbelow}>
                        <View style={style.txtarea}>
                            <Text style={style.headertxt}>Dashboard</Text>
                            <Text style={style.path}>Home / Dashboard V1</Text>
                        </View>

                        <View style={style.statuspart}>
                            <View style={[style.box, { marginBottom: '5%', backgroundColor: '#17A2B8' }]}>
                                <View style={style.upview}>
                                    <Text style={style.btxt1}>150</Text>
                                    <Text style={style.btxt2}>New Orders</Text>
                                </View>
                                <View style={style.downview}>
                                    <Text style={style.bdtxt1}>More Info</Text>
                                    <Icon name='arrow-with-circle-right' style={style.bdicon} />
                                </View>
                            </View>
                            <View style={[style.box, { marginBottom: '5%', backgroundColor: '#28A745' }]}>
                                <View style={style.upview}>
                                    <Text style={style.btxt1}>53%</Text>
                                    <Text style={style.btxt2}>Bounce Rate</Text>
                                </View>
                                <View style={style.downview}>
                                    <Text style={style.bdtxt1}>More Info</Text>
                                    <Icon name='arrow-with-circle-right' style={style.bdicon} />
                                </View>
                            </View>
                            <View style={[style.box, { backgroundColor: '#FFC107' }]}>
                                <View style={style.upview}>
                                    <Text style={[style.btxt1, { color: '#1F2D3D' }]}>44</Text>
                                    <Text style={[style.btxt2, { color: '#1F2D3D' }]}>User Registration</Text>
                                </View>
                                <View style={style.downview}>
                                    <Text style={[style.bdtxt1, { color: '#1F2D3D' }]}>More Info</Text>
                                    <Icon name='arrow-with-circle-right' style={[style.bdicon, { color: '#1F2D3D' }]} />
                                </View>
                            </View>
                            <View style={[style.box, { backgroundColor: '#DC3545' }]}>
                                <View style={style.upview}>
                                    <Text style={style.btxt1}>65</Text>
                                    <Text style={style.btxt2}>Unique Visitor</Text>
                                </View>
                                <View style={style.downview}>
                                    <Text style={style.bdtxt1}>More Info</Text>
                                    <Icon name='arrow-with-circle-right' style={style.bdicon} />
                                </View>
                            </View>
                        </View>

                        <View style={style.chart}>
                            <View style={style.chartheader}>
                                <View style={style.iconview}>
                                    <Icon name='pie-chart' style={style.charttxt} />
                                    <Text style={style.charttxt}>Sales</Text>
                                </View>
                                <View style={style.chartbtnview}>
                                    <View style={style.chartbtn}>
                                        <Text style={style.cbtntxt}>Area</Text>
                                    </View>
                                    <View style={[style.chartbtn, { backgroundColor: '#fff' }]}>
                                        <Text style={[style.cbtntxt, { color: '#D2D6DE' }]}>Donut</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={style.chartview}>
                                <LineChart
                                    areaChart
                                    curved
                                    data={lineData}
                                    data2={lineData2}
                                    showVerticalLines
                                    yAxisTextStyle={{ color: 'gray' }}
                                    spacing={44}
                                    initialSpacing={0}
                                    color1="skyblue"
                                    color2="orange"
                                    textColor1="green"
                                    hideDataPoints
                                    dataPointsColor1="blue"
                                    dataPointsColor2="red"
                                    startFillColor1="skyblue"
                                    startFillColor2="orange"
                                    startOpacity={0.8}
                                    endOpacity={0.3}
                                />
                            </View>
                        </View>

                        <View style={[style.chart, { marginTop: 20 }]}>
                            <View style={style.chartheader}>
                                <View style={style.iconview}>
                                    <Text style={style.charttxt}>Direct Chat</Text>
                                </View>
                                <View style={[style.chartbtnview, { gap: 20 }]}>
                                    <Icon name='minus' style={[style.charttxt, { color: '#D2D6DE', fontSize: 22 }]} />
                                    <Icon name='chat' style={[style.charttxt, { color: '#D2D6DE', fontSize: 22 }]} />
                                    <Icon name='squared-cross' style={[style.charttxt, { color: '#D2D6DE', fontSize: 22 }]} />
                                </View>
                            </View>

                            <View style={{ height: 300 }}>
                                <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 15 }}>
                                    <View style={{ gap: 5, marginBottom: 15 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 16, color: '#1F2D3D', fontWeight: 'bold' }}>Alexander Pierce</Text>
                                            <Text style={{ color: '#D2D6DE', fontWeight: '500' }}>23 jan 2:00 pm</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
                                            <View style={{ height: 50, width: 50, backgroundColor: '#1F2D3D', borderRadius: 50 }}></View>
                                            <Text style={{
                                                flex: 1, color: '#7F7F7F', fontSize: 18, lineHeight: 25, backgroundColor: '#D2D6DE',
                                                padding: 10, borderRadius: 10, borderTopLeftRadius: 0
                                            }}>Is this template really for free? That's unbelievable!</Text>
                                        </View>
                                    </View>
                                    <View style={{ gap: 5, marginBottom: 15 }}>
                                        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 16, color: '#1F2D3D', fontWeight: 'bold' }}>Sarah Bullock</Text>
                                            <Text style={{ color: '#D2D6DE', fontWeight: '500' }}>23 jan 2:05 pm</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row-reverse', alignItems: 'flex-start', gap: 10 }}>
                                            <View style={{ height: 50, width: 50, backgroundColor: '#1F2D3D', borderRadius: 50 }}></View>
                                            <Text style={{
                                                flex: 1, color: '#fff', fontSize: 18, lineHeight: 25, backgroundColor: '#007BFF',
                                                padding: 10, borderRadius: 10, borderTopRightRadius: 0
                                            }}>You better believe it!</Text>
                                        </View>
                                    </View>
                                    <View style={{ gap: 5, marginBottom: 15 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 16, color: '#1F2D3D', fontWeight: 'bold' }}>Alexander Pierce</Text>
                                            <Text style={{ color: '#D2D6DE', fontWeight: '500' }}>23 jan 2:10 pm</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
                                            <View style={{ height: 50, width: 50, backgroundColor: '#1F2D3D', borderRadius: 50 }}></View>
                                            <Text style={{
                                                flex: 1, color: '#7F7F7F', fontSize: 18, lineHeight: 25, backgroundColor: '#D2D6DE',
                                                padding: 10, borderRadius: 10, borderTopLeftRadius: 0
                                            }}>Working with AdminLTE on a great new app! Wanna join?</Text>
                                        </View>
                                    </View>
                                    <View style={{ gap: 5, marginBottom: 15 }}>
                                        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 16, color: '#1F2D3D', fontWeight: 'bold' }}>Sarah Bullock</Text>
                                            <Text style={{ color: '#D2D6DE', fontWeight: '500' }}>23 jan 2:05 pm</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row-reverse', alignItems: 'flex-start', gap: 10 }}>
                                            <View style={{ height: 50, width: 50, backgroundColor: '#1F2D3D', borderRadius: 50 }}></View>
                                            <Text style={{
                                                flex: 1, color: '#fff', fontSize: 18, lineHeight: 25, backgroundColor: '#007BFF',
                                                padding: 10, borderRadius: 10, borderTopRightRadius: 0
                                            }}>I would love to.</Text>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>

                            <View style={{ backgroundColor: 'aliceblue', paddingHorizontal: 20, paddingVertical: 10 }}>
                                <View style={{ flex: 1, flexDirection: 'row', borderWidth: 1, borderColor: '#D2D6DE', borderRadius: 5, overflow: 'hidden' }}>
                                    <TextInput style={{ flex: 1, fontSize: 18, backgroundColor: '#fff', padding: 0, paddingLeft: 15 }} placeholder='Type Message...' placeholderTextColor={'silver'}></TextInput>
                                    <View style={{ backgroundColor: '#007BFF', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 15 }}>
                                        <Text style={{ fontSize: 20, color: '#fff', padding: 0 }}>Send</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </View>

                    <View style={{ backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: 'silver',paddingHorizontal:20,paddingVertical:15 }}>
                        <Text style={{color:'silver',fontSize:18,lineHeight:25}}>Copyright © 2014-2021 AdminLTE.io. All rights reserved. </Text>
                    </View>

                </View>
            </ScrollView>
        </>
    )
}

const style = StyleSheet.create({
    main: {
        flex: 1
    },

    headerbelow: {
        paddingHorizontal: 15,
        paddingVertical: 20
    },

    txtarea: {
        gap: 5
    },

    headertxt: {
        color: '#000',
        fontSize: 27
    },

    path: {
        color: '#7F7F7F',
        fontSize: 16
    },

    statuspart: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        paddingVertical: 30
    },

    statusrow: {
        display: 'flex',
        flexDirection: 'row',

    },
    box: {
        width: '47.5%',
        backgroundColor: '#17A2B8',
        borderRadius: 5,
        overflow: 'hidden'
    },

    upview: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        paddingTop: 15,
        paddingBottom: 25
    },
    btxt1: {
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold'
    },

    btxt2: {
        color: '#fff',
        fontSize: 14
    },

    downview: {
        paddingVertical: 7,
        backgroundColor: 'rgba(0,0,0,0.2)',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },

    bdtxt1: {
        fontSize: 16.5,
        fontWeight: '500',
        color: '#fff'
    },

    bdicon: {
        fontSize: 18,
        color: '#fff'
    },

    chart: {
        backgroundColor: '#fff',
        borderRadius: 5,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)'
    },

    chartheader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#DEE2E6',
        paddingHorizontal: 20,
        paddingVertical: 15
    },

    iconview: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    },

    charttxt: {
        fontSize: 20,
        color: '#1F2D3D'
    },

    chartbtnview: {
        flexDirection: 'row',
        gap: 5
    },

    chartbtn: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: '#007BFF',
        borderRadius: 5
    },
    cbtntxt: {
        fontSize: 17,
        color: '#fff'
    },

    chartview: {
        width: '100%',
        paddingTop: 15,
        color: '#000',
        backgroundColor: '#fff',
        overflow: 'hidden'
    },

    listnumber: {
        paddingVertical: 5,
        paddingHorizontal: 7,
        borderWidth: 1,
        color: '#007BFF'
    }
})

export default Home;