/* eslint  import/prefer-default-export:0 */
export function createTree(array, parent = {}, tree = []) {
    const children = array.filter(c => c.parent === parent.id);

    if (children && children.length) {
        if (!parent.id) {
            tree = children; // eslint-disable-line no-param-reassign
        } else {
            parent.children = children;
        }

        children.forEach((c) => {
            createTree(array, c);
        });
    }

    return tree;
}

export function collectChildren(root, arr) {
    let leaf = arr.filter(p => p.parent === root.id);

    if (leaf.length) {
        let res = [];

        leaf.forEach((l) => {
            res = res.concat(collectChildren(l, arr));
        });

        if (res.length) {
            leaf = leaf.concat(res);
        }
    }
    return leaf;
}
