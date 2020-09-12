const Award = require('./src/model/master/award')
const Location = require('./src/model/master/location')
const Make = require('./src/model/master/make')
const Menu = require('./src/model/master/menu')
const Process = require('./src/model/master/process')
const RoastLevel = require('./src/model/master/roastLevel')
const Smell = require('./src/model/master/smell')
const Species = require('./src/model/master/species')

const Brand = require('./src/model/brand')
const Coffee = require('./src/model/coffee')
const User = require('./src/model/user')

const { connect, disconnect, clearDB } = require('./src/database')

const passwordService = require('./src/services/password.service')

connect()
    .then(async () => {

        try {
            await clearDB()

            await User.create({ email: "user1@email.com", password: passwordService.hash("password") })
            await User.create({ email: "admin@email.com", password: passwordService.hash("password") })

            const l1 = await Location.create({ province: "Chiang Mail", country: "Thailand" })
            const l2 = await Location.create({ province: "Chiang Rai", country: "Thailand" })
            const l3 = await Location.create({ province: "Khon Kaen", country: "Thailand" })

            const m1 = await Make.create({ name: "Drip" })
            const m2 = await Make.create({ name: "Aero Press" })
            const m3 = await Make.create({ name: "French Press" })
            const m4 = await Make.create({ name: "Moka Pot" })

            const me1 = await Menu.create({ name: "Espresso" })
            const me2 = await Menu.create({ name: "Cappuccino" })
            const me3 = await Menu.create({ name: "Americano" })
            const me4 = await Menu.create({ name: "Caffe Latte" })
            const me5 = await Menu.create({ name: "Mocha" })

            const p1 = await Process.create({ name: "Natural" })
            const p2 = await Process.create({ name: "Honey" })

            const r1 = await RoastLevel.create({ name: "Weak" })
            const r2 = await RoastLevel.create({ name: "Medium" })
            const r3 = await RoastLevel.create({ name: "Strong" })

            const s1 = await Smell.create({ name: "Caramel" })
            const s2 = await Smell.create({ name: "Fruity" })
            const s3 = await Smell.create({ name: "Mango" })
            const s4 = await Smell.create({ name: "Guava" })
            const s5 = await Smell.create({ name: "Choco" })

            const sp1 = await Species.create({ name: "Robusta" })
            const sp2 = await Species.create({ name: "Arabica" })

            const a = await Award.create({ name: "Coffee Award 2020", date: "2018-01-01T00:00:00+07:00" })

            const b1 = await Brand.create({ name: "Odds Coffee", awards: [ a._id ] })
            const b2 = await Brand.create({ name: "Starbrew" })

            await Coffee.create({
                name: "Odds Blend",
                beanSampleImage: "sample.png",
                brand: b1._id,
                price: 330,
                priceUnit: 'THB',
                weight: 500,
                netWeight: 450,
                weightUnit: 'GM',
                species: sp1._id,
                roastLevel: r1._id,
                roastDate: '2020-09-01T00:00:00+07:00',
                bestPeriod: '2W',
                location: l1._id,
                process: p1._id,
                makes: [ m1._id, m2._id ],
                menus: [ me1._id, me2._id ],
            })

            await Coffee.create({
                name: "Starbrew Blend",
                beanSampleImage: "sample2.png",
                brand: b2._id,
                price: 350,
                priceUnit: 'THB',
                weight: 450,
                netWeight: 425,
                weightUnit: 'GM',
                species: sp2._id,
                roastLevel: r2._id,
                roastDate: '2020-08-01T00:00:00+07:00',
                bestPeriod: '2M',
                location: l2._id,
                process: p2._id,
                makes: [m1._id],
                menus: [me3._id],
            })

            await disconnect()
            console.log('DONE!')
        } catch (err) {
            console.error(err)
        }
    })