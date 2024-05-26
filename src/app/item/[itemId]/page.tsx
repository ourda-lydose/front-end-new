export default function ItemDetail({params,}: { params: { itemId: string }; }) {
    return (
        <h1> Item Detail {params.itemId} </h1>
    );
}