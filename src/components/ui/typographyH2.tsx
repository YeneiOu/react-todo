
function TextH2(props: { text: string }) {
    const { text } = props;
    return (
      <h2 className="scroll-m-20 underline pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {text}
      </h2>
    );
  }
  
  export default TextH2;