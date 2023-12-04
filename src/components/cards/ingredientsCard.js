

function IngredientsCard({item1Data, item2Data}) {

    return (
        <div>
            <div>
                <h2>Item 1</h2>
                {item1Data && <p>{JSON.stringify(item1Data)}</p>}
            </div>
            <div>
                <h2>Item 2</h2>
                {item2Data && <p>{JSON.stringify(item2Data)}</p>}
            </div>
        </div>
    )
}

export default IngredientsCard;