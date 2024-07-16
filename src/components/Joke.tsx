const Joke = (props: any) => {
    const {setup, punchline} = props
    return (<section className="joke">
        {setup && <h3>Setup: {setup}</h3>}
        <p>{punchline}</p>
        <hr/>
    </section>)
}

export default Joke