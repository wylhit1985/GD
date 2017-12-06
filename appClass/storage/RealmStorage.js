
import Realm from 'realm';

export default class RealmBase {
    //增加
    static create(schema, data) {
        realm.write(
            ()=>{
                for(let i=0;i<data.length;i++){
                    let temp = data[i];
                    realm.create(schema,{id:temp.id,title:temp.title,image:temp.image,mall:temp.mall});
                }
            }
        )
    }

    //查询全部数据
    static loadAll(schema){
        return this.realm.objects(schema);
    }

    //查询指定数据
    static loadOne(schema,filtered){
        //获取对象
        let objects = realm.objects(schema);

        //筛选
        let object = objects.filtered(filtered);

        if(object){//有对象
            return object;
        }else{
            return '未找到数据';
        }
    }

    //删除全部
    static removeAll(schema){
        realm.write(()=>{
            //获取对象
            let objects = realm.objects(schema);

            //删除表
            realm.delete(objects);
        })
    }
}

global.RealmBase = RealmBase;

const HomeSchema = {
    name: 'HomeData',
    properties: {
        id: 'int',
        title: 'string',
        image: 'string',
        mall: 'string',
    }
};


const HTSchema = {
    name: 'HTData',
    properties: {
        id: 'int',
        title: 'string',
        image: 'string',
        mall: 'string',
    }
};

//初始化
let realm = new Realm({schema: [HomeSchema, HTSchema]});