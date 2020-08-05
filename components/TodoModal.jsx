import React, { useState } from 'react'
import { StyleSheet, View, Text, SafeAreaView, FlatList, KeyboardAvoidingView, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import colors from '../Colors';
import TodoItem from './TodoItem';

export default TodoListModal = (props) => {
    const [newTodo, setNewTodo] = useState("");

    // ここは定義し直しているけど,一個前のコンポーネントから継承できないのか？
    const completedCount = props.list.todos.filter((todo) => todo.completed).length;
    const taskCount = props.list.todos.length;

    addTodo = () => {
        let list = props.list;
        // 重複チェック
        if (!list.todos.some(todo => todo.title === newTodo)) {
            list.todos.push({ title: newTodo, completed: false });
            props.updateList(list);
            // これはListを整理して,再描画するため
        }
        setNewTodo("");
        // 初期化
        Keyboard.dismiss();
        // キーボードを閉じる
    }

    deleteTodo = (index) => {
        let list = props.list;
        list.todos.splice(index, 1);
        props.updateList(list);
    }
    // 上手く対象が消えない...

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <SafeAreaView style={styles.container}>
                {/* 閉じるボタン */}
                <TouchableOpacity style={{ position: 'absolute', top: 32, right: 24, zIndex: 10 }} onPress={() => { props.toggleListModal() }}>
                    <AntDesign name="close" size={36} color={colors.black} />
                </TouchableOpacity>
                <View style={[styles.section, styles.header, { borderBottomColor: props.list.color }]}>
                    <View>
                        <Text style={styles.title}>{props.list.name}</Text>
                        <Text style={styles.taskCount}>
                            {completedCount} / {taskCount} Accomplished!!
                    </Text>
                    </View>
                </View>
                <View style={[styles.section, { flex: 3, marginVertical: 16 }]}>
                    <FlatList
                        data={props.list.todos}
                        keyExtractor={(item) => item.title}
                        // TodoListのタイトルが同じやつのデータよろしく！的な
                        showVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TodoItem
                                list={item}
                                updateList={props.updateList}
                                deleteTodo={deleteTodo}
                            />
                        )}
                    />
                    {/* FlatListの仕様は不理解 mapメソッドに近い？ */}
                </View>
                {/* 新規作成の入力フォーム */}
                <View style={[styles.section, styles.footer]}>
                    <TextInput
                        style={[styles.input, { borderColor: props.list.color }]}
                        onChangeText={(text) => setNewTodo(text)}
                        value={newTodo}
                    />
                    <TouchableOpacity
                        style={[styles.addTodo, { backgroundColor: props.list.color }]}
                        onPress={addTodo}
                    >
                        <AntDesign name="plus" size={16} color={colors.white} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        alignSelf: 'stretch',
    },
    header: {
        justifyContent: 'flex-end',
        marginLeft: 64,
        borderBottomWidth: 3,
        paddingTop: 16,
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        color: colors.black,
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: colors.gray,
        fontWeight: '600'
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8,
    },
    addTodo: {
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    // todoContainer: {
    //     paddingVertical: 16,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    // },
    // todo: {
    //     color: colors.black,
    //     fontWeight: '700',
    //     fontSize: 16,
    // }
})