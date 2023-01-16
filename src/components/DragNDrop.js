import React, {useState, useRef} from 'react';

function DragNDrop({data}) {
    const [list, setList] = useState(data);
    const [dragging, setDragging] = useState(false);

    const dragItem = useRef();
    const dragNode = useRef();

    const handleDragStart = (e, params) => {
        console.log('drag starting ...',params)
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend', handelDragEnd)
        setTimeout(()=> {
            setDragging(true)
        },0) 
    }

    const handleDragEnter = (e, params)=>{
        console.log('Entering drag...',params)
        const currentItem = dragItem.current;
        if (e.target !== dragNode.current) {
            console.log("Target is not the same")
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList));
                newList[params.grp1].items.splice(params.item1,0,newList[currentItem.grp1].items.splice(currentItem.item1,1)[0]);
                dragItem.current = params
                return newList
            })
        }
    }

    const handelDragEnd = (e) => {
        console.log('Ending drag...')
        setDragging(false);
        dragNode.current.removeEventListener('dragend', handelDragEnd);
        dragItem.current = null;
        dragNode.current = null;

    }

    const getStyles = (params) =>{
        const currentItem = dragItem.current;
         if (currentItem.grp1 === params.grp1 && currentItem.item1 === params.item1){
            return 'current dnd-item'
         }
         return 'dnd-item'
        
    }
        return (                
            <div className="drag-n-drop">
            {list.map((grp, grp1) => (
              <div key={grp.title} className='dnd-group' onDragEnter={dragging && !grp.items.length?(e) => handleDragEnter(e,{grp1, item1: 0}):null} >
                <div className='group-title'>{grp.title}</div>
                {grp.items.map((item, item1) => (
                  <div 
                  draggable  
                  onDragStart={(e) => {handleDragStart(e, {grp1, item1})}}
                  onDragEnter={dragging?(e) => {handleDragEnter(e, {grp1, item1})}:null} 
                  key={item}  
                  className={dragging?getStyles({grp1, item1}):"dnd-item"}>
                    {item}
                  </div>
                ))}
              </div>
            ))}
            </div>
        )

}

export default DragNDrop;