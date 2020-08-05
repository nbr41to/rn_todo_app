import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from 'react-native';
// ？たっちなぶるおぱしてぃとは→触ると透明になる箱
// ？FlatListとは→
import { AntDesign } from '@expo/vector-icons'
// expoにAntDesign搭載

import colors from './Colors';
// 予め作ったカラーパレットをインポート
import tempData from './tempData'
// TodoのDataをインポート
import TodoList from './components/TodoList'
import AddListModal from './components/AddListModal'


export default class App extends React.Component {
  state = {
    addTodoVisible: false,
    lists: tempData,
  };

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible })
  }

  renderList(list) {
    // ここはアロー関数でもよい,クラスコンポーネントではこの書き方が使える
    return <TodoList list={list} updateList={this.updateList}/>
  }
  // クラスコンポーネントのみ使える,コンポーネントの中にコンポーネントを作っておいて使う使うやつ

  addList = (list) => {
    this.setState({ lists: [...this.state.lists, { ...list, id: this.state.lists.length + 1, todos: [] }] })
  }

  // ここちょっとなにやってるかわからん
  updateList = (list) => {
    this.setState({
      list: this.state.lists.map((item)=>{
        return item.id === list.id ? list : item;
      })
    })
  }
  // TodoDataの整理かな？（必要性の不理解）

  render() {
    return (
      <View style={styles.container}>
        {/* 新規作成用 の Modal */}
        <Modal
          animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={() => { this.toggleAddTodoModal() }}
        >
          <AddListModal closeModal={() => { this.toggleAddTodoModal() }} addList={this.addList} />
          {/* なぜ,渡す関数によって,書き方が違うのかわからん.前者の形で後者はダメだったので,もっとわからん */}
          {/* →わかったわ, */}
        </Modal>

        <View style={{ flexDirection: "row" }}>
          <View style={styles.diver} />
          <Text style={styles.title}>
            ToDo <Text style={{ fontWeight: '300', color: colors.blue }}>List</Text>
          </Text>
          <View style={styles.diver} />
        </View>
        {/* 追加ボタン */}
        <View style={{ marginVertical: 48 }}>
          <TouchableOpacity style={styles.addList} onPress={() => { this.toggleAddTodoModal() }}>
            <AntDesign name="plus" size={16} color={colors.blue} />
          </TouchableOpacity>
          <Text style={styles.add}>Add List</Text>
        </View>
        {/* Todo List の リスト */}
        <View style={{ height: 275, paddingLeft: 32 }}>
          <FlatList
            data={this.state.lists}
            keyExtractor={(item) => item.name}
            horizontal={true}
            showHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps="always"
            // ★重要★キーボードが出た状態で追加ボタンが反応するようになる（addTodoの話）
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    backgroundColor: 'red',
    fontWeight: 'bold',
    fontSize: 30,
  },
  diver: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: colors.black,
    paddingHorizontal: 64,
    // ？普通のPaddingとの違い
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  add: {
    color: colors.blue,
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,

  }
});
