export default function SubscriptionBoxDetail({params,}: { params: { boxId: string }; }) {
    return (
        <h1> Box Detail {params.boxId}</h1>
    );
}