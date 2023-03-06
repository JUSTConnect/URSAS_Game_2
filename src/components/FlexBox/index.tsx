interface FlexBoxProps extends React.HTMLAttributes<HTMLDivElement>
{
    gap?: string;
}


interface FlexBreakProps extends React.HTMLAttributes<HTMLDivElement>
{

}


const FlexBreak = (props: FlexBreakProps) => {
    return <div style={{ 
        flexBasis: '100%',
        height: 0
    }}></div>
}


const FlexBox = (props: FlexBoxProps) => {
    return <div { ...props } style={{
        display: 'flex',
        gap: props.gap,
    }}>
        { props.children }
    </div>
}

export default FlexBox
export { FlexBreak }