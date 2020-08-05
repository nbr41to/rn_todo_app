import React from 'react'
import { useState } from 'react'
// Hooks使えるかな？...
import { StyleSheet, View, Text, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native'
// ？KeyboardAvoidingViewってなに→
import { AntDesign } from '@expo/vector-icons'
import colors from '../Colors';
// import tempData from '../tempData'

export default AddListModal = (props) => {
    const backgroundColor = ["tomato", "orange", "lightgreen", "skyblue", "pink", "gray"]
    // 選択できる色
    const [name, setName] = useState("");
    const [color, setColor] = useState(backgroundColor[0]);

    createTodo = () => {
        const list = { name: name, color: color }
        props.addList(list);
        setName("");
        props.closeModal();
        // こっちはカッコないとだめ
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            {/* 閉じるボタン */}
            <TouchableOpacity style={{ position: 'absolute', top: 64, right: 32 }} onPress={props.closeModal}>
                <AntDesign name="close" size={36} color={colors.black} />
            </TouchableOpacity>
            <View style={{ alignSelf: 'stretch', marginHorizontal: 32 }}>
                <Text style={styles.title}>Create Todo List</Text>
                {/* TodoListの名前入力欄 */}
                <TextInput style={styles.input} placeholder="List Name" onChangeText={text => setName(text)} />
                {/* カラー選択ボタン */}
                <View style={styles.colorBoxs}>
                    {backgroundColor.map(color => {
                        return (
                            <TouchableOpacity
                                key={color}
                                style={[styles.colorSelect, { backgroundColor: color }]}
                                onPress={() => setColor(color)}
                            />
                        )
                    })}
                </View>
                {/* 作成ボタン */}
                <TouchableOpacity
                    style={[styles.create, { backgroundColor: color }]}
                    onPress={createTodo}
                >
                    {/* 変更に対応できるようにスタイルを分けた？ */}
                    <Text style={{ color: colors.white, fontWeight: '600' }}>Created</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.black,
        alignSelf: 'center',
        marginBottom: 16,
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        // 幅のテンプレ？0.3くらいだね
        borderColor: colors.blue,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18,
    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    colorBoxs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4,
        marginHorizontal: 8,
        // marginVertical: 100,
    }

})