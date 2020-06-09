import React,{useState, useEffect} from 'react'
import { Image, Text, View, TextInput} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from '../../../global/style'
import { login } from '../../../core/services/auth-service';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(null);

    useEffect(() => {
       if(status && status.status === 200){
            props.navigation.navigate("Main")
       }
    }, [status]) 

    const renderLoginstatus = (status)=>{
        if(!status){
            return <View/>
        }else if(status.status === 200){
            return (<Text>Login</Text>)
        }else{
            return(<Text>{status.errorString}</Text>)
        }
    }

    const onPressLogin =()=>{
        setStatus(login(username,password))
    }
    const onPressRegister =()=>{
        props.navigation.navigate("Register")
    }
    const onPressForgotPassword =()=>{
        props.navigation.navigate("ForgotPassword")
    }
    return (
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
            <TextInput 
                style={Styles.text_input}  
                onChangeText={text=>setUsername(text)}
                placeholder = 'Email'
                defaultValue={username}
            />   
            <TextInput 
                style={Styles.text_input}  
                onChangeText={text=>setPassword(text)}
                placeholder = 'Password'       
                secureTextEntry         
                defaultValue={password}
            />
            {renderLoginstatus(status)}
            <TouchableOpacity style={Styles.button} onPress={onPressLogin}>
                <Text style={Styles.button_text}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width:300, marginTop:20}}>
            <Icon.Button name="facebook">
            <Text style={{fontSize: 17, paddingLeft:45, color:'white'}}>
             Login with Facebook
             </Text>
            </Icon.Button>
            </TouchableOpacity>
            <TouchableOpacity style={{width:300, marginTop:20, marginBottom:20}}>
            <Icon.Button name="envelope" style={{backgroundColor:'red'}}>
            <Text style={{fontSize: 17, paddingLeft:55, color:'white'}}>
             Login with Gmail
             </Text>
            </Icon.Button>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.button_reg} onPress={onPressRegister}>
                    <Text style={Styles.button_text}>Sign Up</Text>
                </TouchableOpacity>
            <TouchableOpacity  style={{marginTop:10}} onPress={onPressForgotPassword}>
                <Text style={{color:'darkgrey'}}>Forgot password?</Text>
            </TouchableOpacity>
            </View>  
    )   
}

export default Login
