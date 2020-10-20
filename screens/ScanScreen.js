import React from 'react';
import {StyleSheet,Text, View, TouchableOpacity, Image, Alert} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';



export default class ScanScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: "normal"

        }
    }
    getCameraPermissions = async(id)=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions: status === 'granted',
            buttonState: "id",
            scanned: false
        })
    }
    handleBarCodeScanned = async({type,data})=>{
        const {buttonState} = this.state
        if(buttonState==="scanId"){
            this.setState({
                scanned:true,
                buttonState:'normal'
            })
        }


    }

     
    

    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;


        if(buttonState !== "normal"&&hasCameraPermissions){
            return(
                <BarCodeScanner onBarcodeScanned = {scanned?undefined:this.handleBarCodeScanned}
                style = {StyleSheet.absoluteFillObject}></BarCodeScanner>
            )
        }
        else if(buttonState==="normal"){
            return(
                <View style = {styles.container}>

                    <View>
                        <Image
                        source = {require("../assets/scan.png")}
                        style = {{width:200, height:200}} />
                        <Text style = {styles.header}>Scanner</Text>
                    </View>

                   <View style = {styles.inputView}>
                       
                        <TouchableOpacity style = {styles.scanButton}
                        onPress={()=>this.getCameraPermissions("bookId")}>
                            <Text style = {styles.buttonText}>Scan QR Code</Text>
                        </TouchableOpacity>

                        </View>



                </View>
            )
        }

       
    }
}

const styles = StyleSheet.create({
    header:{
        fontSize:30,
        fontWeight:'bold',
        color:'red',
        textAlign:'center'
    },
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
    },
    displayText:{
        fontSize:15,
        textDecorationLine:'underline',

    },
    scanButton:{
        backgroundColor:'blue',
        padding:10,
        margin:10,
        width:'50%',
        

    },
    buttonText:{
        fontSize:20,
        textAlign:'center',
        marginTop: 10,
        color:'yellow',

    },
    inputView:{
        flexDirection:'row',
        margin: 20,

    },
    inputBox:{
        width:200,
        height:40,
        borderWidth:1.5,
        borderRightWidth:0,
        fontSize:20,
        
    },
    submitButton:{
        backgroundColor:'red',
        width:100,
        height:50,

    },
    submitButtonText:{
        padding:10,
        textAlign:'center',
        fontSize: 20,
        fontWeight:'bold',
        color:'white',

    }
})