const getRegion = async (props) => {
    // console.log(props)
    try {
        const response = await fetch(`http://localhost:5000/e-rekap/region/${props.region}`);
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        const data = await response.json();
        const transformedProvinces = data.data.map((item) => {
            return {
                id: item[`${props.id}`],
                nama: item[`${props.nama}`]
            }
        })
        return transformedProvinces
        // setProvince(transformedProvinces)
    } catch (error) {
        console.error(error);
    }
}

export default getRegion;