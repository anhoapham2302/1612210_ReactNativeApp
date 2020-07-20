import React,{useState, useEffect, useContext} from 'react'
import { Image, Text, View, TextInput} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from '../../../global/style'
import { AuthContext } from '../../../provider/auth-provider';
import { CoursesContext } from '../../../provider/course-provider';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const authContext = useContext(AuthContext);
    const coursesContext = useContext(CoursesContext)
    const {state} = useContext(AuthContext)

    
    useEffect(() => {
        if(authContext.state.isAuthenticated){
            props.navigation.navigate("Main");
        }
    },[authContext.state.isAuthenticated])
    
 
    const isAuthenticating= authContext.state.isAuthenticating;

    const renderLoginstatus = (status)=>{
        if(isAuthenticating === true)
        {
            return (<Text></Text>)
        }else{
            if(status === true){
                return (<Text>Login</Text>)
            }else{
            return(<Text>Login failed!</Text>)
            }
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
        {renderLoginstatus(authContext.state.isAuthenticated)}
        <TouchableOpacity style={Styles.button} onPress={()=>{
           authContext.login(username, password)
        }}>
            <Text style={Styles.button_text}>Login</Text>
        </TouchableOpacity>
        
        </View>  
    )
     
                
    
        
          
    
}

export default Login
