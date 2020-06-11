import React,{useState, useEffect, useContext} from 'react'
import { Image, Text, View, TextInput} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from '../../../global/style'
import { login } from '../../../core/services/auth-service';
import { AuthContext } from '../../../provider/auth-provider';
import { set } from 'react-native-reanimated';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(null);
    const {setAuth} = useContext(AuthContext)

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

    // const onPressRegister =()=>{
    //     props.navigation.navigate("Register")
    // }
    // const onPressForgotPassword =()=>{
    //     props.navigation.navigate("ForgotPassword")
    // }
    
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
        <TouchableOpacity style={Styles.button} onPress={()=>{
            setStatus(login(username,password))
            setAuth(login(username,password))
        }}>
            <Text style={Styles.button_text}>Login</Text>
        </TouchableOpacity>
        
        </View>  
    )
     
                
    
        
          
    
}

export default Login
