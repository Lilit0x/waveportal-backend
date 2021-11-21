
const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.1')
    });
    await waveContract.deployed();
    console.log(`Contract added: ${waveContract.address}`);

    let contractBal = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(`The contract balance is: ${hre.ethers.utils.formatEther(contractBal)}`)

    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    
    let waveTxn = await waveContract.wave('First Message');
    await waveTxn.wait();

    
    contractBal = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(`The contract balance after the first wave: ${hre.ethers.utils.formatEther(contractBal)}`)

    const [_, personOne] = await hre.ethers.getSigners();
    waveTxn = await waveContract.connect(personOne).wave('Second message by person one');
    await waveTxn.wait();

    waveTxn = await waveContract.connect(personOne).wave('Testing wave until after 15 mins');
    await waveTxn.wait();
    
    contractBal = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(`The contract balance after the second wave: ${hre.ethers.utils.formatEther(contractBal)}`)

    const allWaves = await waveContract.listAllWavers();
    console.log(allWaves);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

runMain();