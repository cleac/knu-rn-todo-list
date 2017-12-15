import React from 'react';
import {
    Alert, Button, Dimensions, FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput,
    TouchableNativeFeedback, View,
} from 'react-native';

let id = 10;

const [
    STATE_TODO,
    STATE_DONE,
    STATE_DELETED,
] = [1, 2, 3];

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            enteringName: '',
            books: [
                {
                    id: 1,
                    name: 'Таємничий Острів М.Твена',
                    status: STATE_DONE,
                },
                {
                    id: 2,
                    name: 'Хроніки Нарнії',
                    status: STATE_DELETED,
                },
                {
                    id: 3,
                    name: 'Волшебник Средиземномория У. ле Гуин',
                    status: STATE_TODO,
                },
                {
                    id: 4,
                    name: 'Архитектура ПК Танненбаума',
                    status: STATE_TODO,
                },
            ],
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    height: 32,
                    flexDirection: 'row',
                    margin: 16,
                    marginTop: StatusBar.currentHeight + 16,
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                }}>
                    <TextInput 
                        placeholder='Enter book you wanna read'
                        style={{
                            flex: 1,
                            height: 32,
                            marginRight: 8,
                            fontSize: 17,
                        }}
                        value={this.state.enteringName}
                        onChangeText={(text) => this.setState({ enteringName: text })}
                    />
                    <Button
                        title={"Add"}
                        onPress={() => {
                            if (this.state.books.filter((x) => x === this.state.enteringName).length === 0 ) {
                                this.state.books.push({
                                    id: ++id,
                                    name: this.state.enteringName,
                                });
                                this.setState({ books: this.state.books, enteringName: ''});
                            } else {
                                Alert.alert(`You have already added "${this.state.enteringName}"`)
                            }
                        }}
                        style={{
                            width: 32,
                        }}
                    />
                </View>
                <View style={{
                    flex: 1,
                }}>
                    <FlatList
                        data={this.state.books.map(
                            ({ id, name, state }) => ({ key: id, id, name, state })
                        )}
                        renderItem={({item}) => (
                            <View style={styles.item}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        paddingRight: 32,
                                        width: "100%",
                                    }}
                                    onPress={() => {
                                        if (this.state.expandId !== item.id) {
                                            this.setState({ expandId: item.id });
                                        } else {
                                            this.setState({ expandId: null });
                                        }
                                    }}
                                >{item.name}</Text>
                                {item.id === this.state.expandId ?
                                    <View style={{ marginTop: 32, width: "100%", flexDirection: "column", justifyContent: "space-around"}}>
                                        <Button
                                            color="#ff3140"
                                            onPress={() =>
                                                this.setState({books: this.state.books.filter(({id}) => id !== item.id)})}
                                            title="Remove"
                                        />

                                    </View>
                                :null}
                            </View>
                        )}
                    />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    item: {
        padding: 8,
        marginLeft: '5%',
        marginRight: '5%',
        marginBottom: 8,
        width: '90%',
        justifyContent: 'space-between',
        elevation: 0.5,
        borderStyle: 'solid',
        borderRadius: 1,
    }
});
