import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Modal, Animated } from 'react-native'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import colors from '../Colors';
import { Swipeable } from 'react-native-gesture-handler';




export default TodoItem = ({ list, updateList, deleteTodo }) => {
    // これは前の
    // data={todos}とkeyExtractor = {(item) => item.title}によって,
    // 指定されたtodosのオブジェクトをlistという名前で継承した状態

    toggleTodoCompleted = (index) => {
        // let list = list;
        list = list.completed = !list.completed;
        updateList(list);
    }

    renderRightActions = (dragX) => {
        // deleteの文字が大きくなる→いる？
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0.9],
            extrapolate: 'clamp',
        });

        // 削除ボタンを透明にする→エラーで動かん
        const opacity = dragX.interpolate({
            inputRange: [-100, -20, 0],
            outputRange: [1, 0.9, 0],
            extrapolate: 'clamp',
        });

        return (
            <TouchableOpacity onPress={() => { deleteTodo() }}>
                <Animated.View style={[styles.deleteButton, { opacity: opacity }]}>
                    <Animated.Text style={{ color: colors.white, fontWeight: "800", transform: [{ scale }] }}>Delete</Animated.Text>
                </Animated.View>
            </TouchableOpacity>
        );
    }
    return (
        <Swipeable renderRightActions={(_, dragX) => renderRightActions(dragX)}>
            <View style={styles.todoContainer}>
                {/* チェックボタン */}
                <TouchableOpacity onPress={toggleTodoCompleted}>
                    <Ionicons
                        name={list.completed ? "ios-square" : "ios-square-outline"}
                        size={24} color={colors.gray}
                        style={{ width: 32 }}
                    />
                </TouchableOpacity>
                {/* Todo項目 */}
                <Text
                    style={[
                        styles.todo,
                        {
                            textDecorationLine: list.completed ? "line-through" : "none",
                            color: list.completed ? colors.gray : colors.black
                        }
                    ]}
                >
                    {list.title}</Text>
            </View>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    todoContainer: {
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 32,
    },
    todo: {
        color: colors.black,
        fontWeight: '700',
        fontSize: 16,
    },
    deleteButton: {
        flex: 1,
        backgroundColor: colors.red,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
    }
})