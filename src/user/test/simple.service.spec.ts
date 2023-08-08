import { Test } from "@nestjs/testing"
import { SimpleService } from "../simple.service"

describe('SimpleService', () => {
  let service: SimpleService
  beforeAll(async () => {
    
    const module = Test.createTestingModule({
      providers: [SimpleService]
    }).compile()

    service = (await module).get(SimpleService)
  })

  describe('testMe()', () => {
    describe('when called', () => {
      let result

      beforeEach(() => {
        result = service.testMe(5)
      })
    
      it('should bootstrap service', () => {
        expect(service).toBeDefined()
      })
      
      it('should return a number', () => {
        expect(typeof result).toBe('number')
      })
      
      it('should return a number + 1', () => {
        expect(result).toBe(6)
      })
    })
  })

  describe('testMeWithMocks()', () => {
    describe('when called', () => {
      let result

      beforeEach(() => {
        jest.spyOn(service, 'genRandom').mockReturnValue(2)
        result = service.testMeWithMock(5)
      })

      afterEach(() => {
        jest.restoreAllMocks()
      })
      
      it('should return a number', () => {
        expect(typeof result).toBe('number')
      })
      
      it('should return a number + 1', () => {
        expect(result).toBe(7)
      })
      
      it('should call getRandom()', () => {
        expect(service.genRandom).toHaveBeenCalled()
        expect(service.genRandom).toHaveReturnedWith(2)
      })
    })
  })
})