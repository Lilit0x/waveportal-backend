const main = async () => {
    const Token = await hre.ethers.getContractFactory('WavePortal');
    const portal = await Token.deploy({
        value: hre.ethers.utils.parseEther('0.001')
    });
    await portal.deployed();

    console.log(`Wave Portal address is: ${portal.address}`);
}

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