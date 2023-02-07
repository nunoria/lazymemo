

export default function CardList() {

    let cardList = Array.from({length: 10}, (v, i) => i+1); // i(index) 1씩 증가

    return (
        <div className="bg-contents flex justify-center py-5">
            <div className="pbox grid grid-cols-[minmax(280px,_1fr)] lg:grid-cols-3 md:grid-cols-2 gap-5 xl:gap-8">
                {
                    cardList.length > 0 && cardList.map((v, id) => {
                        return (
                            <Card key={id} value={v} />
                        )
                    })
                }
            </div>
        </div>
    )
}


const Card = ({ value }) => {
    return (
        <div className=" bg-red-300 rounded-2xl aspect-square text-center">
            <span>{value}</span>
        </div>
    )
}