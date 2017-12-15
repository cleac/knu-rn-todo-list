import React from 'react';
import {Alert, Button, FlatList, StatusBar, StyleSheet, Text, TextInput, View,} from 'react-native';

import {Task} from "./tasks/model";
import {
    getButtonColor, getButtonsActive, getButtonTitle, makeTextStyle, markArchived, markDeleted, markDone,
    orderTasks
} from "./tasks/bl";

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            enteringName: '',
            tasks: [
                new Task(`Евгений Онегин
                виликий русский писака`),
                new Task('ений Онегин'),
                new Task('ний Онегин'),
                new Task('й Онегин'),
                new Task('ний Онегин'),
                new Task('ений Онегин'),
                new Task('Евгений Онегин'),
                new Task('Евгений Онегин'),
            ],
            expandId: null,
        };
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
                        onChangeText={(text) => this.setState({enteringName: text})}
                    />
                    <Button
                        title={"Add"}
                        onPress={() => {
                            if (this.state.enteringName.length !== 0) {
                                this.state.tasks.push(new Task(this.state.enteringName));
                                this.setState({tasks: this.state.tasks, enteringName: ''});
                            } else {
                                Alert.alert(`Write something down!`);
                            }
                        }}
                        style={{
                            width: 32,
                        }}
                    />
                </View>
                <View style={{
                    width: "100%",
                }}>
                    <FlatList
                        data={orderTasks(this.state.tasks).map((x) => x)}

                        renderItem={({item: task}) =>
                            <TaskView
                                task={task}
                                expanded={task.id === this.state.expandId}
                                handlers={{
                                    delete: () => {
                                        this.setState({
                                            tasks: markDeleted(this.state.tasks, [task.id]),
                                            expandId: null,
                                        });
                                    },
                                    archive: () => {
                                        this.setState({
                                            tasks: markArchived(this.state.tasks, [task.id]),
                                            expandId: null,
                                        });
                                    },
                                    mark_done: () => {
                                        this.setState({
                                            tasks: markDone(this.state.tasks, [task.id]),
                                            expandId: null,
                                        });
                                    }
                                }}

                                onExpand={() => {
                                    if (this.state.expandId !== task.id) {
                                        this.setState({expandId: task.id});
                                    } else {
                                        this.setState({expandId: null});
                                    }
                                }}
                            />}
                    />
                </View>
            </View>
        );
    }
}

const TaskView = ({task, handlers, onExpand, expanded}) => (
    <View style={styles.item}>
        <Text
            style={makeTextStyle(task, {
                fontSize: 16,
            })}
            onPress={onExpand}
        >{task.name}</Text>
        {expanded ?
            <View style={{
                marginTop: 32,
                width: "100%",
                flexDirection: "column",
                justifyContent: "space-around"
            }}>
                {getButtonsActive(task).map((type) => (
                    <Button
                        key={type}
                        color={getButtonColor(type)}
                        onPress={handlers[type]}
                        title={getButtonTitle(type)}
                    />)
                 )}
            </View>
            : null}
    </View>
);


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
