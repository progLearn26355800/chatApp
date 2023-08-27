import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native'
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";
import { withAuthenticator } from 'aws-amplify-react-native'

import Amplify from "@aws-amplify/core";
import awsconfig from "../src/aws-exports";

Amplify.configure(awsconfig);

const MySignInFooter = () => <Text>My Footer</Text>

function SignOutButton() {
    const { signOut } = useAuthenticator();
    return <Button title='Sign Out' onPress={() => signOut()} />;
}

const MySignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style={styles.container}>
            <Input
                placeholder='Enter your email'
                label='Email'
                leftIcon={{ type: 'material', name: 'email' }}
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Input
                placeholder='Enter your password'
                label='Password'
                leftIcon={{ type: 'material', name: 'lock' }}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />
            <Button title='sign in' style={styles.button} />
            <Button title='register' style={styles.button} />
        </View>
    )
}

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Authenticator.Provider>
            <Authenticator
                components={{
                    // SignIn: MySignIn,
                    SignIn: ({ fields, ...props}) =>  (
                        <Authenticator.SignIn 
                        {...props} 
                        fields={[
                            // ...fields,
                            {
                                name: 'hoge',
                                label: 'hoge',
                                type: 'default',
                                placeholder: 'hogeehoge'
                            }
                        ]}
                        Footer={MySignInFooter} />
                    ),
                    SignUp: (props) => (
                        <Authenticator.SignUp {...props} Footer={MySignInFooter} />
                    ),
                }}
            >
                <View style={styles.container}>
                    <SignOutButton />
                </View>
            </Authenticator>
        </Authenticator.Provider>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        marginTop: 100,
    },
    button: {
        width: 370,
        marginTop: 10
    }
});

// export default withAuthenticator(Login);
export default Login;