import { useEffect, useState } from "react"
export type FillType = 'capibara' | 'grass'| null
export type FieldType = {
    id: number,
    x: number,
    y:number,
    fill: FillType
}

const getInitialState =(maxWidth:number, capibaraIndex: number)=>{

    const maxIndex = maxWidth * maxWidth

    const array: FieldType[] = []
    let x = 1
    let y = 1
    for (let step = 1; step <= maxIndex; step++) {
        array.push({
            id: step,
            x,
            y,
            fill: capibaraIndex === step ? 'capibara': null
        })
        x++
        if(x > maxWidth) {
            y++
            x=1
        }

    }
    return array
}
export const useApp = () =>{
const maxWidth = 25


    const [fields, setFields]= useState(getInitialState(maxWidth, 20))


    console.log('fields',fields)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const directionKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
             if (directionKeys.includes(event.key)) {
                event.preventDefault();
            }
            if (!directionKeys.includes(event.key)) return;

            setFields((prevFields) => {
                const capibaraPos = prevFields.find(({ fill }) => fill === 'capibara') as FieldType;
                const previousCapibaraField = { ...capibaraPos, fill: null };

                let nextX = capibaraPos.x;
                let nextY = capibaraPos.y;

        switch (event.key) {
          case 'ArrowUp':
            nextY = nextY > 1 ? nextY - 1 : maxWidth
            break;
          case 'ArrowDown':
            nextY = nextY < maxWidth ? nextY + 1 : 1
            break;
          case 'ArrowLeft':
            nextX = nextX > 1 ? nextX - 1 : maxWidth
            break;
          case 'ArrowRight':
            nextX = nextX < maxWidth ? nextX + 1 : 1
            break;
        }

        const capibaraNextField = prevFields.find(f => f.x === nextX && f.y === nextY) as FieldType;

                const capibaraNextFieldSettled = { ...capibaraNextField, fill: 'capibara' } as FieldType;

                const restOfFields = prevFields.filter(
                    ({ id }) => id !== previousCapibaraField.id && id !== capibaraNextField.id
                );

                return [previousCapibaraField, capibaraNextFieldSettled, ...restOfFields].sort((a, b) => a.id - b.id);
            });
        };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return {fields,maxWidth}
}