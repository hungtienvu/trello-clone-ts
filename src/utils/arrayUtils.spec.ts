import { 
  findItemIndexById ,
  moveItem,
  removeItemAtIndex,
  insertItemAtIndex
} from "./arrayUtils"
import { Item } from "./arrayUtils"

type ItemArr = Item[]


describe("array utils", () => {
  

  describe("#findItemIndexById", () => {
    const list: ItemArr = [
      { id: "1"},
      { id:"2"}
    ]
    it("cannot find item, as it's not existing", () => {
      expect(findItemIndexById(list, "3")).toEqual(-1)
    })
    
    it("found item", () => {
      expect(findItemIndexById(list, "2")).toEqual(1)
    })
  })

  describe("#insertItemAtIndex", () => {
    const list: ItemArr = [
      { id: "1"},
      { id:"2"}
    ]

    it("inserts ok", () => {
      const listExpected: ItemArr = [
        {id: "3"},
        { id: "1"},
        { id:"2"}
      ]
      const after = insertItemAtIndex(list, {id: "3"}, 0) 
      expect(after).toEqual(listExpected)
    })

    it("inserts out of bound", () => {

      const listExpected: ItemArr = [
        {id: "3"},
        { id: "1"},
        { id:"2"}
      ]
      const after = insertItemAtIndex(list, {id: "3"}, -10) 
      expect(after).toEqual(listExpected)
    })

  })

  //remove item at the from,
  //and insert to that returned array the to item
  describe("#moveItem", () => {
    const list: ItemArr = [
      { id: "1"},
      { id:"2"}
    ]

    it("moves items okay", () => {
      const listAfter: ItemArr = [
        { id: "2"},
        { id:"1"}
      ]
      expect(moveItem(list,0,1)).toEqual(listAfter)
    })


    it("not move item because same from and to index", () => {
      const listAfter: ItemArr = [
        { id: "1"},
        { id:"2"}
      ]
      
      expect(moveItem(list,0,0)).toEqual(listAfter)
    })

  })

  describe("#removeItemAtIndex", () => {
    const list: ItemArr = [
      { id: "1"},
      { id:"2"}
    ]

    it("removes item successful", () => {
      expect(removeItemAtIndex(list, 0)).toEqual([{id:"2"}])
    })

    it("remove item at none existing index aka not removing anything", () => {
      expect(removeItemAtIndex(list, 10)).toEqual(list)
    })

  })
})
