import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native'
import colors from '../Colors';
import TodoModal from './TodoModal'

export default TodoList = ({ list, updateList }) => {
    const completedCount = list.todos.filter((todo) => todo.completed).length;
    const remainingCount = list.todos.length - completedCount;
    const [showListVisible, setShow] = useState(false);
    toggleListModal = () => {
        setShow(!showListVisible);
    }

    return (
        <View>
            {/* Todo を 編集する Modal */}
            <Modal
                animationType="slide"
                visible={showListVisible}
                onRequestClose={() => { toggleListModal() }}
                // これはどうやらAndroidの戻るボタンらしい
            >
                <TodoModal
                    list={list}
                    toggleListModal={toggleListModal}
                    updateList={updateList}
                />
            </Modal>
            {/* 横スク の Todo List */}
            <TouchableOpacity
                style={[styles.listContainer, { backgroundColor: list.color }]}
                onPress={toggleListModal}
            >
                <Text style={styles.listTitle} numberOfLines={1}>{list.name}</Text>
                <View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.count}>{remainingCount}</Text>
                        <Text style={styles.subTitle}>Remaining</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.count}>{completedCount}</Text>
                        <Text style={styles.subTitle}>Completed!!</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        // Vertical：垂直方向
        paddingHorizontal: 16,
        // Horizontal：水平方向
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: 'center',
        width: 200,
        // 横スクロールは自動的？
    },
    listTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.white,
        marginBottom: 18,

    },
    count: {
        fontSize: 48,
        fontWeight: '200',
        color: colors.white,
    },
    subTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.white,
    },
})