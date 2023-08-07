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

  it('should bootstrap service', () => {
    expect(service).toBeDefined()
  })

  describe('testMe()', () => {
    describe('when called', () => {
      let result

      beforeEach(() => {
        result = service.testMe(5)
      })
      
      it('should return a number', () => {
        expect(typeof result).toBe('number')
      })
      
      it('should return a number + 1', () => {
        expect(result).toBe(6)
      })
    })
  })
})