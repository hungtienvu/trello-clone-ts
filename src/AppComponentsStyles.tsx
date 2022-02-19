import cn from "classnames"
import React, { FC } from "react"
import { DroppableProvided, DraggableProvided } from "react-beautiful-dnd"

type RefProp = {
  parentRef?: React.RefObject<HTMLDivElement>
}

type AppContainerProps = {
  provided: DroppableProvided
  innerRef: (element: HTMLElement | null) => any;
}

export const AppContainer: FC<AppContainerProps> = ({
  children,
  provided,
  innerRef
}) => {
  return (
    <div  
      className="
        flex 
        h-screen
        gap-4 
        bg-[#3179ba] 
        items-start 
        p-10
        grow-1
        overflow-auto
        "
        ref={innerRef}
        {...provided.droppableProps}
        >
    {children}
    </div>
  );
}


type ColumnContainerProps = {
  provided: DraggableProvided
  innerRef: (element: HTMLElement | null) => any;
}
export const ColumnContainer: FC<ColumnContainerProps> =  (({
  children, 
  innerRef, 
  provided
}) => {
 return (
    <div 
      className="w-[300px]"
      ref={innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      >
      { children }
    </div>
 )
})

export const ColumnContent: FC<RefProp> = ({children, parentRef, ...rest}) => {
  return (
    <div 
      ref={parentRef}
      {...rest}
      className="bg-[#ebecf0] min-w-[300px] grow-0 shrink-0 rounded p-4">
      {children}
    </div>
  )
}


type CardContainerProps = {
  isDragging?: boolean
  innerRef: (element: HTMLElement | null) => any
  provided: DraggableProvided
}

export const CardContainer: FC<CardContainerProps> =  (({
    children,
    isDragging,
    innerRef,
    provided
  }) => {
  
  const classes = cn(
    "cursor-pointer mb-1 px-3 py-2 rounded shadow flex justify-between bg-white",
  )
  return (  
      <div 
        className={classes}
        ref={innerRef}
        {...provided.dragHandleProps}
        {...provided.draggableProps}
        >
          { children }
      </div>
  )
})

export const Footer: FC = () =>{
  return (
    <div className="fixed left-4 bottom-4">
        <div
          className="flex justify-end p-4 bg-gray-600 rounded-lg gap-5 bg-opacity-20"
        >
          <a href="" target="_blank">
          💻 Folk me on Github
          </a>
          <a href="#">👉🏻 Tutorial</a>
        </div>
      
    </div>
  )
}
