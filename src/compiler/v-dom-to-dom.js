/**
 * Created by zhengqiguang on 2017/6/23.
 */


const v_dom_to_dom = {
    compiler(vDom){

        return this.walker(vDom);

    },

    walker(vDom){
        if (vDom.type === "tag") {

            let $tag = document.createElement(vDom.tagName);
            vDom.$rDom = $tag;
            this.setAttr($tag, vDom.attrs);
            for (let i = 0, c; c = vDom.children[i]; i++) {
                $tag.appendChild(this.walker(c));
            }
            return $tag;

        } else if (vDom.type === "text") {

            let $txt = document.createTextNode(vDom.content);
            vDom.$rDom = $txt;
            return $txt;

        } else if (vDom.type === "frag") {

            let $frag = document.createDocumentFragment();
            vDom.$rDom = $frag;
            for (let i = 0, c; c = vDom.children[i]; i++) {
                $frag.appendChild(this.walker(c));
            }

            // vDom.$rDom = $frag.childNodes[0]; //将$rDom 赋值为 第一个 childNode,替换时才能够找到
            return $frag;
        }

    },
    setAttr($d, attrs){
        for (let key  in attrs) {
            $d.setAttribute(key, attrs[key]);
        }
    }


}


export default v_dom_to_dom;